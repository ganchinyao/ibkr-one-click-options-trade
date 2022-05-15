import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button as RNButton, View } from 'react-native';
import { buyRequest, getSample, getTicker, sellRequest, updateTicker } from './api';
import { HeaderContent } from './components/HeaderContent';
import { selectContractAmtUSD, selectTicker, useAppDispatch, useAppSelector } from './store';
import { Button, ButtonSize } from './components/common/Button';
import Colors from './constants/Colors';
import { DTE } from './constants';
import { OptionType } from './api/types';
import { addBuyOrder, selectBuyOrders } from './store/contract/completedBuyOrderSlice';

const App = () => {
  const selectedTicker = useAppSelector(selectTicker);
  const contractAmtUSD = useAppSelector(selectContractAmtUSD);
  const buyOrders = useAppSelector(selectBuyOrders);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <Text>Green Rocket</Text>
      <RNButton
        title="Sample API"
        onPress={async () => {
          await getSample();
        }}
      />
      <RNButton
        title="Get current ticker"
        onPress={async () => {
          const currentTicker = await getTicker();
          console.log('## current ticker: ', currentTicker);
        }}
      />
      <RNButton
        title="Update current ticker"
        onPress={async () => {
          const resp = await updateTicker('SPY');
          console.log('## Update current ticker: ' + resp);
        }}
      />
      <HeaderContent />
      <View style={styles.buttonsContainer}>
        <Button
          text="BUY Call"
          onPress={async () => {
            const resp = await buyRequest({
              ticker: selectedTicker,
              type: OptionType.CALL,
              amount_USD: contractAmtUSD,
              dte: DTE,
            });
            dispatch(addBuyOrder(resp));
          }}
          size={ButtonSize.big}
        />
        <Button
          text="SELL CALL"
          onPress={async () => {
            // if (contractDate === '' || numContract === -1 || strike === -1) {
            //   return;
            // }
            // await sellRequest({
            //   ticker: selectedTicker,
            //   type: OptionType.PUT,
            //   contract_date: contractDate,
            //   strike,
            //   num_contract: numContract,
            // });
          }}
          size={ButtonSize.big}
          buttonColor={Colors.red500}
        />
        {buyOrders.map((buyOrder) => (
          <Text>{buyOrder.ticker}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-evenly',
  },
});

export default App;
