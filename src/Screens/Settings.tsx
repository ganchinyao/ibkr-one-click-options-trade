import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { getPriceOfTicker } from '../api';
import { Button } from '../components/common/Button';
import Colors from '../constants/Colors';

const Settings = () => {
  const [priceOfTicker, setPriceOfTicker] = useState('');
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.testConnectionContainer}>
          <Button
            text="Test connection"
            onPress={async () => {
              try {
                const resp = await getPriceOfTicker('SPY');
                setPriceOfTicker(resp);
              } catch (err) {
                setPriceOfTicker('error');
              }
            }}
            buttonColor={Colors.bluegrey700}
          />
          {priceOfTicker ? (
            priceOfTicker === 'error' ? (
              <Text style={styles.testConnectionResultFail}>Error connecting to IBKR.</Text>
            ) : (
              <Text style={styles.testConnectionResultSuccess}>{`Current price of SPY: ${priceOfTicker}`}</Text>
            )
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconTrash: {
    marginRight: 15,
  },
  historyTitle: {
    fontSize: 16,
    color: Colors.white70,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 15,
    height: '100%',
    backgroundColor: Colors.background,
  },
  testConnectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  testConnectionResultSuccess: {
    marginTop: 10,
    color: Colors.green500,
    fontSize: 16,
  },
  testConnectionResultFail: {
    marginTop: 10,
    color: Colors.red500,
    fontSize: 16,
  },
});

export default Settings;
