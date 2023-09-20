import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { getPriceOfTicker } from '../api';
import { OrderType } from '../api/types';
import { Button } from '../components/common/Button';
import { RadioButton } from '../components/common/RadioButton';
import { TextInputWithTitle } from '../components/common/TextInputWithTitle.tsx';
import Colors from '../constants/Colors';
import { useAppDispatch, useAppSelector } from '../store';
import { selectExchange, selectOrderType, updateExchange, updateOrderType } from '../store/contract/settingSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const [priceOfTicker, setPriceOfTicker] = useState('');
  const orderType = useAppSelector(selectOrderType);
  const exchange = useAppSelector(selectExchange);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.orderTypeContainer}>
          <Text style={styles.orderTypeTitleText}>Select order type:</Text>
          <View style={styles.orderTypeRadioButtonContainer}>
            <RadioButton
              label="LIMIT"
              checked={orderType === OrderType.LIMIT}
              onPress={() => dispatch(updateOrderType(OrderType.LIMIT))}
            />
            <RadioButton
              label="MARKET"
              checked={orderType === OrderType.MARKET}
              onPress={() => dispatch(updateOrderType(OrderType.MARKET))}
            />
          </View>
        </View>
        <View style={styles.exchangeContainer}>
          <TextInputWithTitle
            type="text"
            value={exchange}
            onChangeValue={(newText: string) => {
              dispatch(updateExchange(newText));
            }}
            titleText="Exchange:"
            titleTextStyle={styles.exchangeTitleText}
          />
        </View>
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
    justifyContent: 'center',
  },
  orderTypeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  orderTypeRadioButtonContainer: {
    alignContent: 'flex-start',
  },
  orderTypeTitleText: {
    color: Colors.green500,
    fontSize: 16,
    marginBottom: 10,
  },
  exchangeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  exchangeTitleText: {
    color: Colors.green500,
    fontSize: 16,
  },
  testConnectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
