import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { useAppDispatch, useAppSelector } from '../store';
import { initHistory, selectHistoryList } from '../store/contract/historySlice';
import { getHistoryDataStore } from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Summary } from '../api/types';
import Clipboard from '@react-native-clipboard/clipboard';
import { getDailySummary } from '../utils/order';
import SummaryList from '../components/SummaryList/SummaryList';

const onCopyAllToClipboardPress = (summaryList: Summary[]) => {
  let allEntries = '';
  summaryList.forEach((item) => {
    const { date, totalCommission, totalPnl, numTrades } = item;
    const newEntry = `${date} ${totalCommission} ${totalPnl} ${numTrades}\n`;
    allEntries += newEntry;
  });
  Clipboard.setString(allEntries);
};

const PnL = () => {
  const dispatch = useAppDispatch();
  const historyList = useAppSelector(selectHistoryList);
  const summaryList = getDailySummary(historyList);
  const refresh = () => {
    const getHistory = async () => {
      const ls = await getHistoryDataStore();
      return ls;
    };
    getHistory().then((resp) => {
      dispatch(initHistory(resp));
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.historyTitle}>History</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                onCopyAllToClipboardPress(summaryList);
              }}
            >
              <Ionicons name={'clipboard-outline'} size={24} color={Colors.orange500} />
            </TouchableOpacity>
          </View>
        </View>
        <SummaryList summaryList={summaryList} refresh={refresh} />
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
});

export default PnL;
