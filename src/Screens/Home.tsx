import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { buyRequest } from '../api';
import { HeaderContent } from '../components/HeaderContent';
import {
  selectBuyMethod,
  selectContractAmtUSD,
  selectContractQuantity,
  selectDTE,
  selectTicker,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { Button, ButtonSize } from '../components/common/Button';
import Colors from '../constants/Colors';
import { OptionType } from '../api/types';
import { BoughtList } from '../components/BoughtList';
import { isBuyParamsInvalid, onBuyFail, onBuySuccess } from '../utils/order';
import { selectExchange, selectOrderType } from '../store/contract/settingSlice';

const App = () => {
  const selectedTicker = useAppSelector(selectTicker);
  const dte = useAppSelector(selectDTE);
  const contractAmtUSD = useAppSelector(selectContractAmtUSD);
  const contractQuantity = useAppSelector(selectContractQuantity);
  const buyMethod = useAppSelector(selectBuyMethod);
  const orderType = useAppSelector(selectOrderType);
  const exchange = useAppSelector(selectExchange);

  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.selectionText}>Select Ticker:</Text>
        <View style={styles.headerContentContainer}>
          <HeaderContent />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            text="BUY CALL"
            onPress={async () => {
              try {
                if (isBuyParamsInvalid(contractAmtUSD, contractQuantity, selectedTicker, dte)) {
                  return;
                }
                const resp = await buyRequest({
                  ticker: selectedTicker,
                  type: OptionType.CALL,
                  amount_USD: contractAmtUSD,
                  contract_quantity: contractQuantity,
                  buy_method: buyMethod,
                  dte: dte as number,
                  order_type: orderType,
                  exchange,
                });
                onBuySuccess(dispatch, resp);
              } catch (ex) {
                onBuyFail(OptionType.CALL, ex);
              }
            }}
            size={ButtonSize.big}
          />
          <Button
            text="BUY PUT"
            onPress={async () => {
              try {
                if (isBuyParamsInvalid(contractAmtUSD, contractQuantity, selectedTicker, dte)) {
                  return;
                }
                const resp = await buyRequest({
                  ticker: selectedTicker,
                  type: OptionType.PUT,
                  amount_USD: contractAmtUSD,
                  contract_quantity: contractQuantity,
                  buy_method: buyMethod,
                  dte: dte as number,
                  order_type: orderType,
                  exchange,
                });
                onBuySuccess(dispatch, resp);
              } catch (ex) {
                onBuyFail(OptionType.PUT, ex);
              }
            }}
            size={ButtonSize.big}
            buttonColor={Colors.red500}
          />
        </View>
        <Text style={styles.boughtListTitle}>Current Position</Text>
        <View style={styles.boughtListContainer}>
          <BoughtList containerStyle={styles.boughtList} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
    paddingTop: 5,
  },
  container: {
    paddingHorizontal: 15,
    height: '100%',
    backgroundColor: Colors.background,
  },
  headerContentContainer: {
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 50,
    justifyContent: 'space-evenly',
  },
  boughtListContainer: {
    flex: 1,
  },
  boughtListTitle: {
    paddingTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.white70,
  },
  boughtList: {},
  selectionText: {
    fontSize: 14,
    color: Colors.white70,
  },
});

export default App;
