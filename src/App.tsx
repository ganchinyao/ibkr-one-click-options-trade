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
import { BoughtList } from './components/BoughtList';

const App = () => {
  const selectedTicker = useAppSelector(selectTicker);
  const contractAmtUSD = useAppSelector(selectContractAmtUSD);
  const buyOrders = useAppSelector(selectBuyOrders);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.selectionText}>Select Ticker:</Text>

        {/* <RNButton
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
        /> */}
        <View style={styles.headerContentContainer}>
          <HeaderContent />
        </View>
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
                  text1: `Successfully bought ${resp.ticker} CALL`,
                  visibilityTime: 3000,
                });
                dispatch(addBuyOrder(resp));
                printGreen('Successfully bought Call.', resp);
              } catch (ex) {
                Toast.show({
                  type: 'error',
                  text1: 'Failed to buy Call.',
                  visibilityTime: 3000,
                });
                printRed('Failed to buy Call.', ex);
              }
            }}
            size={ButtonSize.big}
          />
          <Button
            text="BUY PUT"
            onPress={async () => {
              try {
                const resp = await buyRequest({
                  ticker: selectedTicker,
                  type: OptionType.PUT,
                  amount_USD: contractAmtUSD,
                  dte: DTE,
                });
                Toast.show({
                  type: 'success',
                  text1: `Successfully bought ${resp.ticker} PUT`,
                  visibilityTime: 3000,
                });
                dispatch(addBuyOrder(resp));
                printGreen('Successfully bought Put.', resp);
              } catch (ex) {
                Toast.show({
                  type: 'error',
                  text1: 'Failed to buy Put.',
                  visibilityTime: 3000,
                });
                printRed('Failed to buy Put.', ex);
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
  boughtListContainer: {},
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
