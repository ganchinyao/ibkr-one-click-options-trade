import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ActionType } from '../../api/types';
import Colors from '../../constants/Colors';
import { Button, ButtonSize } from '../common/Button';
import { styles } from './styles';
import { HistoryItemProps } from './types';
import { getDate, getPrice, getTime } from '../../utils/order';

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const date = getDate(item);
  const time = getTime(item);
  const price = getPrice(item);
  const { ticker, num_contract, strike, type, action } = item;
  const getDefaultTextStyle = () => {
    const textStyle: TextStyle[] = [styles.itemDefaultText];
    if (action === ActionType.BUY) {
      textStyle.push(styles.itemGreenText);
    } else {
      textStyle.push(styles.itemRedText);
    }
    return textStyle;
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemColumn}>
        <Text style={getDefaultTextStyle()}>{`${date}  ${time}`}</Text>

        <View style={styles.itemRow}>
          <Text style={[getDefaultTextStyle(), styles.itemTextBold]}>{ticker}</Text>
          <Text style={getDefaultTextStyle()}>{strike}</Text>
          <Text style={getDefaultTextStyle()}>{type}</Text>
          <Text style={getDefaultTextStyle()}>{`$${price}`}</Text>
          <Text style={getDefaultTextStyle()}>{`x${num_contract}`}</Text>
        </View>
      </View>
      <View style={styles.ctaButtonContainer}>
        <Button
          text="Copy"
          onPress={() => {
            Clipboard.setString(`${date} ${time} ${ticker} ${type} ${price} ${num_contract}`);
          }}
          size={ButtonSize.small}
          buttonColor={Colors.orange500}
        />
      </View>
    </View>
  );
};

export default HistoryItem;
