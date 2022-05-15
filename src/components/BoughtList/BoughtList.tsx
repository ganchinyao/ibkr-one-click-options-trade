import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './styles';
import { BoughtListProps } from './types';
import { useAppSelector } from '../../store';
import { selectBuyOrders } from '../../store/contract/completedBuyOrderSlice';
import BoughtItem from './BoughtItem';
import { BuyResponse } from '../../api/types';
import { getDateTime } from '../../utils/order';

const renderItem = ({ item }: { item: BuyResponse }) => {
  return <BoughtItem item={item} />;
};
const BoughtList: React.FC<BoughtListProps> = ({ containerStyle }) => {
  const buyOrders = useAppSelector(selectBuyOrders);

  const renderList = () => {
    return (
      <FlatList
        data={buyOrders}
        keyExtractor={(item) => {
          const time = getDateTime(item);
          return `${item.id}${time}`;
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return <View style={[styles.listContainer, containerStyle]}>{renderList()}</View>;
};

export default BoughtList;
