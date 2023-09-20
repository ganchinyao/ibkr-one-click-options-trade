import React from 'react';
import { View, Text } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Colors from '../../constants/Colors';
import { Button, ButtonSize } from '../common/Button';
import { styles } from './styles';
import { SummaryListItemProps } from './types';

const SummaryListItem: React.FC<SummaryListItemProps> = ({ item }) => {
  const { date, totalCommission, totalPnl, numTrades } = item;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemColumn}>
        <Text style={[styles.itemDefaultText, styles.itemTitleText]}>{`${date}`}</Text>
        <Text style={[styles.itemDefaultText]}>{`${numTrades} orders`}</Text>
        <View style={styles.itemRow}>
          <Text style={[styles.itemDefaultText]}>{'Total Commissions paid:'}</Text>
          <Text style={[styles.itemDefaultText, styles.itemTextBold]}>{`$${totalCommission}`}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={[styles.itemDefaultText]}>{'Total P/L:'}</Text>
          <Text
            style={[
              styles.itemDefaultText,
              totalPnl >= 0 ? styles.itemGreenText : styles.itemRedText,
              styles.itemTextBold,
            ]}
          >{`$${totalPnl}`}</Text>
        </View>
      </View>
      <View style={styles.ctaButtonContainer}>
        <Button
          text="Copy"
          onPress={() => {
            Clipboard.setString(`${date} ${totalCommission} ${totalPnl} ${numTrades}`);
          }}
          size={ButtonSize.small}
          buttonColor={Colors.orange500}
        />
      </View>
    </View>
  );
};

export default SummaryListItem;
