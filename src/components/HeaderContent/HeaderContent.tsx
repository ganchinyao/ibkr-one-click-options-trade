import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { updateTicker } from '../../api';
import { getAvailableDefaultUSD, getAvailableTickers } from '../../utils';
import { Chip } from '../common/Chip';
import { TextInputWithTitle } from '../common/TextInputWithTitle.tsx';
import { styles } from './styles';
import { HeaderContentProps } from './types';
import {
  useAppSelector,
  useAppDispatch,
  setContractAmtUSD,
  selectContractAmtUSD,
  setDTE,
  selectDTE,
} from '../../store';
import { selectTicker, setTicker } from '../../store';

const HeaderContent: React.FC<HeaderContentProps> = ({}) => {
  // The `state` arg is correctly typed as `RootState` already
  const selectedTicker = useAppSelector(selectTicker);
  const dte = useAppSelector(selectDTE);
  const contractAmtUSD = useAppSelector(selectContractAmtUSD);
  const dispatch = useAppDispatch();
  const availableTickers = getAvailableTickers();
  const availableUSD = getAvailableDefaultUSD();

  const renderTickerChipsRow = () => {
    return (
      <ScrollView style={styles.chipContainer} horizontal showsHorizontalScrollIndicator={false}>
        {availableTickers.map((ticker) => (
          <Chip
            key={ticker}
            isSelected={selectedTicker === ticker}
            text={ticker}
            onPress={async () => {
              updateTicker(ticker).then((resp) => {
                dispatch(setTicker(ticker));
                console.log('## Update current ticker: ' + resp);
              });
            }}
            containerStyle={styles.chipStyle}
          />
        ))}
      </ScrollView>
    );
  };

  const renderTextInputs = () => {
    return (
      <View style={styles.inputRow}>
        <TextInputWithTitle
          type="currency"
          value={contractAmtUSD}
          onChangeValue={(newValue: number) => {
            dispatch(setContractAmtUSD(newValue));
          }}
          titleText="USD to buy:"
        />
        <View style={styles.tickerInputContainer}>
          <TextInputWithTitle
            value={selectedTicker}
            onChangeValue={(newText: string) => {
              dispatch(setTicker(newText));
            }}
            titleText="Select Ticker:"
          />
        </View>
        <View style={styles.tickerInputContainer}>
          <TextInputWithTitle
            value={dte ? dte.toString() : ''}
            onChangeValue={(newText: string) => {
              if (newText === '') {
                dispatch(setDTE());
              } else {
                dispatch(setDTE(Number(newText)));
              }
            }}
            titleText="Select DTE:"
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  };

  const renderUSDChipsRow = () => {
    return (
      <ScrollView style={styles.chipContainer} horizontal showsHorizontalScrollIndicator={false}>
        {availableUSD.map((usd) => (
          <Chip
            key={usd}
            isSelected={contractAmtUSD === usd}
            text={`${usd}`}
            onPress={async () => {
              dispatch(setContractAmtUSD(usd));
            }}
            containerStyle={[styles.chipStyle, styles.usdChipStyle]}
          />
        ))}
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      {renderTickerChipsRow()}
      {renderTextInputs()}
      {renderUSDChipsRow()}
    </View>
  );
};

export default HeaderContent;
