import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { HistoryList } from '../components/HistoryList';
import Colors from '../constants/Colors';
import { AppDispatch, useAppDispatch, useAppSelector } from '../store';
import { initHistory, selectHistoryList } from '../store/contract/historySlice';
import { clearHistoryDataStore, getHistoryDataStore } from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BuyResponse, SellResponse } from '../api/types';
import Clipboard from '@react-native-clipboard/clipboard';
import { getDate, getPrice, getTime } from '../utils/order';

const onDeleteHistoryPress = (dispatch: AppDispatch) => {
  Alert.alert('Delete all History', 'Are you sure you want to delete all History? This move is permanent', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => {
        dispatch(initHistory([]));
        clearHistoryDataStore();
      },
    },
  ]);
};
const onCopyAllToClipboardPress = (historyList: (BuyResponse | SellResponse)[]) => {
  let allEntries = '';
  historyList.forEach((historyItem) => {
    const date = getDate(historyItem);
    const time = getTime(historyItem);
    const price = getPrice(historyItem);
    const { ticker, num_contract, type, action, strike } = historyItem;
    const newEntry = `${date} ${time} ${ticker} ${strike} ${type} ${price} ${num_contract} ${action}\n`;
    allEntries += newEntry;
  });
  Clipboard.setString(allEntries);
};

const History = () => {
  const dispatch = useAppDispatch();
  const historyList = useAppSelector(selectHistoryList);
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
              style={styles.iconTrash}
              onPress={() => {
                onDeleteHistoryPress(dispatch);
              }}
            >
              <Ionicons name={'trash-outline'} size={24} color={Colors.orange500} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onCopyAllToClipboardPress(historyList);
              }}
            >
              <Ionicons name={'clipboard-outline'} size={24} color={Colors.orange500} />
            </TouchableOpacity>
          </View>
        </View>
        <HistoryList historyList={historyList} refresh={refresh} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
    paddingTop: 5,
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

export default History;
