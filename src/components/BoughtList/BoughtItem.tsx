import React from 'react';
import { View, Text } from 'react-native';
import { sellRequest } from '../../api';
import { OptionType } from '../../api/types';
import Colors from '../../constants/Colors';
import { printGreen, printRed } from '../../utils';
import { Button, ButtonSize } from '../common/Button';
import { styles } from './styles';
import { BoughtItemProps } from './types';
import Toast from 'react-native-toast-message';
import { useAppDispatch } from '../../store';
import { removeBuyOrder } from '../../store/contract/completedBuyOrderSlice';

const BoughtItem: React.FC<BoughtItemProps> = ({ item }) => {
  const { ticker, num_contract, purchased_price, purchased_time, strike, type, contract_date } = item;
  const dispatch = useAppDispatch();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemColumn}>
        <View style={styles.itemRow}>
          <Text style={[styles.itemDefaultText, styles.itemTextBold]}>{ticker}</Text>
          <Text style={[styles.itemDefaultText, type === OptionType.CALL ? styles.itemGreenText : styles.itemRedText]}>
            {type}
          </Text>
          <Text style={[styles.itemDefaultText, styles.itemCyanText]}>{`$${purchased_price}`}</Text>
          <Text style={[styles.itemDefaultText]}>{`x${num_contract}`}</Text>
        </View>
        <Text style={[styles.itemDefaultText]}>{strike}</Text>
        <Text style={[styles.itemDefaultText]}>{purchased_time}</Text>
      </View>
      <View style={styles.ctaButtonContainer}>
        <Button
          text="Sell"
          onPress={async () => {
            try {
              const resp = await sellRequest({
                ticker,
                type,
                contract_date,
                strike,
                num_contract,
              });
              Toast.show({
                type: 'success',
                text1: `Successfully sold ${resp.num_contract}x ${resp.ticker}`,
                visibilityTime: 3000,
              });
              dispatch(removeBuyOrder(resp.id));
              printGreen('Sell succeed.', resp);
            } catch (ex) {
              Toast.show({
                type: 'error',
                text1: 'Failed to sell.',
                visibilityTime: 3000,
              });
              printRed('Sell failed.', ex);
            }
          }}
          size={ButtonSize.big}
          buttonColor={Colors.orange500}
        />
      </View>
    </View>
  );
};

export default BoughtItem;
