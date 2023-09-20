from ib_insync import *
from threading import Timer
from termcolor import colored
import json
from datetime import datetime, timedelta
import pytz
from math import floor
from quart import Quart, request, Response
import asyncio

URL = {
    'BUY': {
        'url': '/buy',
        'auth_code': 'Crystal Paladin'
    },
    'SELL': {
        'url': '/sell',
        'auth_code': 'Bolmeteus Steel Dragon'
    },
    # Get the current ticker selected.
    # Format: response: Current ticket selected, e.g. 'SPY'
    'GET_CURRENT_TICKER': {
        'url': '/current_ticker',
        'auth_code': 'Uberdragon Jabaha'
    },
    # Update current ticker.
    # Format: request: { ticker: `${ticker}` }
    'UPDATE_CURRENT_TICKER': {
        'url': '/update_current_ticker',
        'auth_code': 'Uberdragon Bajula'
    },
    # Get price of a particular ticker
    # # Format: request: { ticker: `${ticker}` }
    'GET_PRICE_OF_TICKER': {
        'url': '/price',
        'auth_code': 'Miraculous Snare'
    }
}


def getpath(nested_dict, value, prepath=()):
    for k, v in nested_dict.items():
        path = prepath + (k,)
        if v == value:  # found value
            return path
        elif hasattr(v, 'items'):  # v is a dict
            p = getpath(v, value, path)  # recursive call
            if p is not None:
                return p


def make_error(error_msg):
    return {"error": error_msg}


def has_error(resp):
    if type(resp) is dict and 'error' in resp:
        return True
    return False


def get_error(err):
    return err['error']


def is_authorized(data, auth_code):
    return data == auth_code


def print_auth_code_wrong(url):
    print(colored(url + ' auth_code wrong', 'red'))


def print_exception(url, exception):
    print(colored(url + ' POST fail with exception: ' + exception, 'red'))


def print_error_msg(err_msg):
    print(colored(err_msg, 'red'))


class GreenRocket:
    def __init__(self):
        self.ib = IB()
        self.ticker = 'SPY'  # Not using this at the moment

    # -------------------------- All private methods

    def _get_desired_contract_date(self, expirations, dte):
        """
        From the list of expirations, return the lowest expiration date that is >= current date now + dte.
        For example, if we have [20220513, 20220514, 20220515, 20220516, 20220517] as the expirations, and dte is 3, now is 20220513, we will return 20220516

        """
        now = self.get_newyork_date_now('%Y%m%d')
        dtelist = list(map(lambda x: int((datetime.strptime(
            x, '%Y%m%d') - timedelta(days=dte)).strftime('%Y%m%d')) - int(now), expirations))
        # Find closest date that is >= now + DTE
        index = next(x[0] for x in enumerate(dtelist) if x[1] >= 0)
        return expirations[index]

    async def _get_buy_contract(self, ticker, ticker_current_price, strikes, contract_date, type, exchange):
        """
        Create and return a buy contract that is placed At The Money (ATM).

        """
        strikes_mapped = map(lambda x: x - ticker_current_price, strikes)
        index = next(x[0] for x in enumerate(strikes_mapped) if x[1] >= 0)
        # Loop through all possible strikes in strikes to find a combination of strikes that belong to the ATM of that particular contract_date
        while True:
            contract = Option(ticker, contract_date,
                              strikes[index], type, exchange)
            qualify_contract = await self.ib.qualifyContractsAsync(contract)
            if qualify_contract:
                print('found')
                break
            else:
                print('iterating')
                index = index + 1
        return (contract, qualify_contract)

    async def _get_bid_ask_price(self, qualify_contract):
        ticker = self.ib.reqMktData(*qualify_contract)
        start_time = datetime.now()
        while str(ticker.bid) == 'nan':
            # Must wait for the ticker to be filled
            self.ib.sleep(0.01)
            if (datetime.now() - start_time).total_seconds() > 5:
                error_msg = 'Timed out waiting to get mid price'
                print_error_msg(error_msg)
        bid = ticker.bid
        ask = ticker.ask
        return (bid, ask)

    async def _get_mid_price(self, qualify_contract):
        (bid, ask) = await self._get_bid_ask_price(qualify_contract)
        mid_price = round((bid + ask) / 2, 2)
        return mid_price

    def _place_order(self, contract, option_order, order_type):
        order = self.ib.placeOrder(contract, option_order)
        start_time = datetime.now()
        timeout = 10 if order_type == 'LIMIT' else 5
        while order.orderStatus.status != 'Filled':
            self.ib.sleep(0.1)
            if (datetime.now() - start_time).total_seconds() > timeout:
                error_msg = 'Timed out placing order. Order is cancelled'
                # Cancel the limit order if it is not filled
                if order_type == 'LIMIT':
                    self.ib.cancelOrder(order.order)
                raise Exception(error_msg)
        return order
    # -------------------------- End of All private methods

    async def get_current_price_of_ticker(self, ticker):
        """
        Return the current price of the ticker

        Args:
            ticker: string, e.g. 'TSLA'
        """
        ticker = await self.ib.reqTickersAsync(Stock(ticker, 'SMART', 'USD'))
        return ticker[0].marketPrice()

    def get_newyork_date_now(self, format):
        """
        Return New York date now in a particular string format.

        """
        return datetime.now(pytz.timezone('US/Eastern')).strftime(format)

    async def buy(self, ticker, type, dte, amountUSD, num_contract, buy_method, exchange, order_type):
        """
        Buy option.
        """
        try:
            print('buy params:', ticker, type, dte, amountUSD,
                  num_contract, buy_method, exchange, order_type)
            with await self.ib.connectAsync():
                stk = Stock(ticker, 'SMART', 'USD')
                await self.ib.qualifyContractsAsync(stk)
                chains = await self.ib.reqSecDefOptParamsAsync(
                    stk.symbol, '', stk.secType, stk.conId)
                chain = next(c for c in chains if c.tradingClass ==
                             stk.symbol and c.exchange == 'SMART')
                expirations = sorted(exp for exp in chain.expirations)[:dte+1]
                strikes = [strike for strike in chain.strikes]
                ticker_current_price = await self.get_current_price_of_ticker(ticker)
                contract_date = self._get_desired_contract_date(
                    expirations, dte)
                (contract, qualify_contract) = await self._get_buy_contract(
                    ticker, ticker_current_price, strikes, contract_date, type, exchange)

                # Buy in terms of quantity of option
                if buy_method == 'CONTRACT':
                    if order_type == "LIMIT":
                        mid_price = await self._get_mid_price(qualify_contract)
                        option_order = LimitOrder(
                            'BUY', num_contract, mid_price)
                    else:
                        option_order = MarketOrder('BUY', num_contract)
                    filled_order = self._place_order(
                        contract, option_order, order_type)
                    purchased_price = filled_order.orderStatus.avgFillPrice
                    commission = round(
                        filled_order.fills[0].commissionReport.commission, 2)
                # Buy in terms of total amount of USD of options
                else:
                    mid_price = await self._get_mid_price(qualify_contract)
                    if (mid_price * 100) > amountUSD:
                        error_msg = 'Not enough money to even 1 purchase ATM contract'
                        print_error_msg(error_msg)
                        return make_error(error_msg)
                    num_contract = floor(amountUSD / (mid_price * 100))
                    if order_type == "LIMIT":
                        option_order = LimitOrder(
                            'BUY', num_contract, mid_price)
                    else:
                        option_order = MarketOrder('BUY', num_contract)
                    filled_order = self._place_order(
                        contract, option_order, order_type)
                    purchased_price = filled_order.orderStatus.avgFillPrice
                    commission = round(
                        filled_order.fills[0].commissionReport.commission, 2)
                resp = {
                    'id': contract.conId,
                    'ticker': ticker,
                    'type': type,
                    'action': 'BUY',
                    'contract_date': contract_date,
                    'strike': contract.strike,
                    'num_contract': num_contract,
                    'purchased_price': purchased_price,
                    'purchased_time': self.get_newyork_date_now('%Y/%m/%d %H:%M:%S'),
                    "commission": commission
                }
                print(colored('Success! ' + str(resp), 'green'))
                return resp

        except Exception as ex:
            print_error_msg(ex)
            return make_error(str(ex))

    async def sell(self, ticker, type, contract_date, strike, num_contract, exchange, order_type):
        try:
            print('sell params:', ticker, type,
                  contract_date, strike, num_contract, exchange, order_type)
            with await self.ib.connectAsync():
                stk = Stock(ticker, 'SMART', 'USD')
                await self.ib.qualifyContractsAsync(stk)
                contract = Option(ticker, contract_date,
                                  strike, type, exchange)
                if order_type == 'LIMIT':
                    qualify_contract = await self.ib.qualifyContractsAsync(contract)
                    mid_price = await self._get_mid_price(qualify_contract)
                    option_order = LimitOrder('SELL', num_contract, mid_price)
                else:
                    option_order = MarketOrder('SELL', num_contract)
                filled_order = self._place_order(
                    contract, option_order, order_type)
                sell_price = filled_order.orderStatus.avgFillPrice,
                commission = round(
                    filled_order.fills[0].commissionReport.commission, 2)
                PnL = round(
                    filled_order.fills[0].commissionReport.realizedPNL, 2)
                resp = {
                    'id': contract.conId,
                    'ticker': ticker,
                    'type': type,
                    'action': 'SELL',
                    'contract_date': contract_date,
                    'strike': contract.strike,
                    'num_contract': num_contract,
                    'sell_price': sell_price,
                    'sell_time': self.get_newyork_date_now('%Y/%m/%d %H:%M:%S'),
                    "commission": commission,
                    "pnl": PnL
                }
                print(colored('Success! ' + str(resp), 'green'))
                return resp
        except Exception as ex:
            print_error_msg(ex)
            return make_error(str(ex))

    def updateTicker(self, newTicker):
        self.ticker = newTicker

    def getTicker(self):
        return self.ticker

    async def get_price_of_ticker(self, ticker):
        try:
            with await self.ib.connectAsync():
                ticker_current_price = await self.get_current_price_of_ticker(ticker)
                print('#ticker_current_price', ticker_current_price)
                return ticker_current_price
        except Exception as ex:
            print_error_msg(ex)
            return -1


greenrocket = GreenRocket()
app = Quart(__name__)


@ app.before_request
async def before_request_func():
    auth_code = URL[getpath(URL, request.path)[0]]['auth_code']
    raw = await request.get_data()
    data = json.loads(raw.decode())
    if not is_authorized(data['auth_code'], auth_code):
        print_auth_code_wrong(request.path)
        return Response('auth_code wrong', status=401)


@ app.route('/')
async def hello():
    print("At / route")
    print(colored('hello', 'red'), colored('world', 'green'))
    return Response('hello world', status=200)


@ app.route(URL['BUY']['url'], methods=['POST'])
async def route_buy():
    print("At " + URL['BUY']['url'] + " route")
    raw = await request.get_data()
    data = json.loads(raw.decode())
    exchange = data.get('exchange', 'SMART')
    order_type = data.get('order_type', 'MARKET')
    resp = await greenrocket.buy(
        data['ticker'], data['type'], data['dte'], data['amount_USD'], data['contract_quantity'], data['buy_method'], exchange, order_type)
    if has_error(resp):
        return Response(get_error(resp), status=500)
    return resp


@ app.route(URL['SELL']['url'], methods=['POST'])
async def route_sell():
    print("At " + URL['SELL']['url'] + " route")
    raw = await request.get_data()
    data = json.loads(raw.decode())
    exchange = data.get('exchange', 'SMART')
    order_type = data.get('order_type', 'MARKET')
    resp = await greenrocket.sell(
        data['ticker'], data['type'], data['contract_date'], data['strike'], data['num_contract'], exchange, order_type)
    if has_error(resp):
        return Response(get_error(resp), status=500)
    return resp


@ app.route(URL['GET_CURRENT_TICKER']['url'], methods=['POST'])
async def route_get_current_ticker():
    print("At " + URL['GET_CURRENT_TICKER']['url'] + " route")
    print(colored(URL['GET_CURRENT_TICKER']['url'] +
          '. Retrieved current ticker: ' + greenrocket.getTicker(), 'green'))
    return greenrocket.getTicker()


@ app.route(URL['UPDATE_CURRENT_TICKER']['url'], methods=['POST'])
async def route_post_current_ticker():
    print("At " + URL['UPDATE_CURRENT_TICKER']['url'] + " route")
    raw = await request.get_data()
    data = json.loads(raw.decode())
    greenrocket.updateTicker(data['ticker'])
    new_ticker = greenrocket.getTicker()
    print(colored(URL['UPDATE_CURRENT_TICKER']['url'] + '. Updated ticker to: ' +
                  new_ticker, 'green'))
    return 'Successfully update ticker to ' + new_ticker


@ app.route(URL['GET_PRICE_OF_TICKER']['url'], methods=['POST'])
async def route_post_current_ticker_price():
    print("At " + URL['GET_PRICE_OF_TICKER']['url'] + " route")
    raw = await request.get_data()
    data = json.loads(raw.decode())
    price = await greenrocket.get_price_of_ticker(data['ticker'])
    if price == -1:
        return Response('error', status=500)
    print(colored(URL['GET_PRICE_OF_TICKER']['url'] + '. Price of ticker: ' +
                  str(price), 'green'))
    return str(price)

if __name__ == '__main__':
    util.patchAsyncio()
    asyncio.run(app.run(host='0.0.0.0', port=4000))
