import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button as RNButton, View } from 'react-native';
import { buyRequest, getSample, getTicker, sellRequest, updateTicker } from './api';
import { HeaderContent } from './components/HeaderContent';
import { selectContractAmtUSD, selectContractDate, selectNumContract, selectTicker, useAppSelector } from './store';
import { Button, ButtonSize } from './components/common/Button';
import Colors from './constants/Colors';

const App = () => {
  const selectedTicker = useAppSelector(selectTicker);
  const contractAmtUSD = useAppSelector(selectContractAmtUSD);
  const contractDate = useAppSelector(selectContractDate);
  const numContract = useAppSelector(selectNumContract);

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
          text="BUY"
          onPress={async () => {
            await buyRequest({
              ticker: selectedTicker,
              amountUSD: contractAmtUSD,
            });
          }}
          size={ButtonSize.big}
        />
        <Button
          text="SELL"
          onPress={async () => {
            if (contractDate === '' || numContract === -1) {
              return;
            }
            await sellRequest({
              ticker: selectedTicker,
              contractDate,
              numContract,
            });
          }}
          size={ButtonSize.big}
          buttonColor={Colors.red500}
        />
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
