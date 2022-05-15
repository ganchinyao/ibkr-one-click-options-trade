import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { styles } from './styles';
import { HistoryListProps } from './types';
import { useAppSelector } from '../../store';
import HistoryItem from './HistoryItem';
import { ActionType, BuyResponse, SellResponse } from '../../api/types';
import { selectHistoryIsRefreshing } from '../../store/contract/historySlice';
import { getDateTime } from '../../utils/order';
import Colors from '../../constants/Colors';

const renderItem = ({ item }: { item: BuyResponse | SellResponse }) => {
  const time = getDateTime(item);
  return <HistoryItem item={item} key={item.id + time} />;
};
const HistoryList: React.FC<HistoryListProps> = ({ refresh, historyList, containerStyle }) => {
  const isRefreshing = useAppSelector(selectHistoryIsRefreshing);
  const renderList = () => {
    return (
      <FlatList
        keyExtractor={(item) => {
          const time = getDateTime(item);
          return `${item.id}${time}`;
        }}
        data={historyList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={[Colors.white70, Colors.white70]}
            tintColor={Colors.white70}
          />
        }
      />
    );
  };

  return <View style={[styles.listContainer, containerStyle]}>{renderList()}</View>;
};

export default HistoryList;
