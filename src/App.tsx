import React from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import { buyRequest, getSample, getTicker, updateTicker } from './api';
import { HeaderContent } from './components/HeaderContent';
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>Green Rocket</Text>
        <Button
          title="Sample API"
          onPress={async () => {
            await getSample();
          }}
        />
        <Button
          title="Buy"
          onPress={async () => {
            await buyRequest();
          }}
        />
        <Button
          title="Get current ticker"
          onPress={async () => {
            const currentTicker = await getTicker();
            console.log('## current ticker: ', currentTicker);
          }}
        />
        <Button
          title="Update current ticker"
          onPress={async () => {
            const resp = await updateTicker('SPY');
            console.log('## Update current ticker: ' + resp);
          }}
        />
        <HeaderContent />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
