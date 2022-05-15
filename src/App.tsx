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
import Toast from 'react-native-toast-message';
import { printRed, printGreen } from './utils';

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
      <RNButton
        title="Show Success Toast"
        onPress={() => {
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'Text2',
            visibilityTime: 3000,
          });
        }}
      />
      <RNButton
        title="Show Error Toast"
        onPress={() => {
          Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: 'Text2',
            visibilityTime: 3000,
          });
        }}
      />
      <HeaderContent />
      <View style={styles.buttonsContainer}>
        <Button
          text="BUY Call"
          onPress={async () => {
            try {
              const resp = await buyRequest({
                ticker: selectedTicker,
                type: OptionType.CALL,
                amount_USD: contractAmtUSD,
                dte: DTE,
              });
              Toast.show({
                type: 'success',
                text1: `Successfully bought ${resp.ticker}`,
                visibilityTime: 3000,
              });
              dispatch(addBuyOrder(resp));
              printGreen('Successfully bought.', resp);
            } catch (ex) {
              Toast.show({
                type: 'error',
                text1: 'Failed to buy.',
                visibilityTime: 3000,
              });
              printRed('Failed to buy,', ex);
            }
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
