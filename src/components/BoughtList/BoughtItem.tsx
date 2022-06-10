import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { sellRequest } from '../../api';
import { OptionType } from '../../api/types';
import Colors from '../../constants/Colors';
import { Button, ButtonSize } from '../common/Button';
import { styles } from './styles';
import { BoughtItemProps } from './types';
import { useAppDispatch } from '../../store';
import { onSellFail, onSellSuccess, removeBoughtItemRow } from '../../utils/order';
import Ionicons from 'react-native-vector-icons/Ionicons';

const renderMetric = (purchasedPrice: number, num: number) => {
  return (
    <View style={styles.metricRow} key={num}>
      <Text style={[styles.itemMetricText, num === 10 ? styles.itemGreenText : undefined]}>{`+${num}%: $${(
        purchasedPrice *
        (1 + num / 100)
      ).toFixed(2)}`}</Text>
      <Text style={[styles.itemMetricText, num === 10 ? styles.itemRedText : undefined]}>{`-${num}%: $${(
        purchasedPrice *
        (1 - num / 100)
      ).toFixed(2)}`}</Text>
    </View>
  );
};

const BoughtItem: React.FC<BoughtItemProps> = ({ item }) => {
  const { ticker, num_contract, purchased_price, purchased_time, strike, type, contract_date } = item;
  const dispatch = useAppDispatch();
  const metric = [3, 5, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20];

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
        <Text style={[styles.itemDefaultText]}>{purchased_time.split(' ')[1]}</Text>
        <View style={styles.metricContainer}>{metric.map((num) => renderMetric(purchased_price, num))}</View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.deleteIconContainer}
          onPress={() => {
            removeBoughtItemRow(dispatch, item);
          }}
        >
          <Ionicons name={'close-outline'} size={28} color={Colors.bluegrey700} />
        </TouchableOpacity>
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
                onSellSuccess(dispatch, item, resp);
              } catch (ex) {
                onSellFail(type, ex);
              }
            }}
            size={ButtonSize.big}
            buttonColor={Colors.orange500}
          />
        </View>
      </View>
    </View>
  );
};

export default BoughtItem;
