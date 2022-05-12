import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button as RNButton, View } from 'react-native';
import { buyRequest, getSample, getTicker, updateTicker } from './api';
import { HeaderContent } from './components/HeaderContent';
import { store } from './store';
import { Provider } from 'react-redux';
import { Button, ButtonSize } from './components/common/Button';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>Green Rocket</Text>
        <RNButton
          title="Sample API"
          onPress={async () => {
            await getSample();
          }}
        />
        <RNButton
          title="Buy"
          onPress={async () => {
            await buyRequest();
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
          <Button text="BUY" onPress={() => {}} size={ButtonSize.big} />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
});

export default App;
