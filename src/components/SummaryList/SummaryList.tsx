import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SummaryListProps } from './types';
import { useAppSelector } from '../../store';
import { Summary } from '../../api/types';
import { selectHistoryIsRefreshing } from '../../store/contract/historySlice';
import Colors from '../../constants/Colors';
import SummaryListItem from './SummaryListItem';
import { styles } from './styles';

const renderItem = ({ item }: { item: Summary }) => {
  return <SummaryListItem item={item} key={item.date} />;
};
const SummaryList: React.FC<SummaryListProps> = ({ refresh, summaryList, containerStyle }) => {
  const isRefreshing = useAppSelector(selectHistoryIsRefreshing);
  const renderList = () => {
    return (
      <FlatList
        keyExtractor={(item) => item.date}
        data={summaryList}
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

export default SummaryList;
