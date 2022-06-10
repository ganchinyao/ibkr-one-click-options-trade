import React, { useState } from 'react';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { updateTicker } from '../../api';
import { getAvailableDefaultContractAmount, getAvailableDefaultUSD, getAvailableTickers } from '../../utils';
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
  setContractQuantity,
  selectContractQuantity,
  selectBuyMethod,
  setBuyMethod,
} from '../../store';
import { selectTicker, setTicker } from '../../store';
import { Button, ButtonSize } from '../common/Button';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BuyMethod } from '../../api/types';

const HeaderContent: React.FC<HeaderContentProps> = ({}) => {
  // The `state` arg is correctly typed as `RootState` already
  const selectedTicker = useAppSelector(selectTicker);
  const dte = useAppSelector(selectDTE);
  const contractAmtUSD = useAppSelector(selectContractAmtUSD);
  const contractQuantity = useAppSelector(selectContractQuantity);
  const buyMethod = useAppSelector(selectBuyMethod);
  const dispatch = useAppDispatch();
  const availableTickers = getAvailableTickers();
  const availableUSD = getAvailableDefaultUSD();
  const availableContractAmount = getAvailableDefaultContractAmount();
  const [isBuyMethodModalOpen, setIsBuyMethodModalOpen] = useState(false);

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
      <View style={styles.overallInputContainer}>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <TextInputWithTitle
              value={selectedTicker}
              onChangeValue={(newText: string) => {
                dispatch(setTicker(newText));
              }}
              titleText="Select Ticker:"
            />
          </View>
          <View style={styles.inputContainer}>
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
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            {buyMethod === BuyMethod.USD ? (
              <TextInputWithTitle
                type={'currency'}
                value={contractAmtUSD}
                onChangeValue={(newValue: number) => {
                  dispatch(setContractAmtUSD(newValue));
                }}
                titleText={'USD to buy:'}
              />
            ) : (
              <TextInputWithTitle
                type={'text'}
                value={contractQuantity.toString()}
                onChangeValue={(newValue: number) => {
                  dispatch(setContractQuantity(newValue));
                }}
                titleText={'Contract to buy'}
              />
            )}
          </View>

          <Button
            text={buyMethod === BuyMethod.CONTRACT ? 'Contract' : 'USD'}
            onPress={() => {
              setIsBuyMethodModalOpen(true);
            }}
            size={ButtonSize.small}
            containerStyle={styles.buyMethodContainer}
            textStyle={styles.buyMethodText}
            buttonColor={Colors.bluegrey700}
          />
        </View>
      </View>
    );
  };

  const renderContractAmtChipsRow = () => {
    return (
      <ScrollView style={styles.chipContainer} horizontal showsHorizontalScrollIndicator={false}>
        {availableContractAmount.map((contractAmt) => (
          <Chip
            key={contractAmt}
            isSelected={contractQuantity === contractAmt}
            text={`${contractAmt}`}
            onPress={async () => {
              dispatch(setContractQuantity(contractAmt));
            }}
            containerStyle={[styles.chipStyle, styles.contractChipStyle]}
          />
        ))}
      </ScrollView>
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
    <View>
      {renderTickerChipsRow()}
      {renderTextInputs()}
      {buyMethod === BuyMethod.USD ? renderUSDChipsRow() : renderContractAmtChipsRow()}
      <Modal animationType="slide" transparent={true} visible={isBuyMethodModalOpen}>
        <View style={styles.buyMethodModalContainer}>
          <View style={styles.buyMethodModal}>
            <TouchableOpacity
              style={styles.buyMethodTouchableOpacity}
              onPress={() => {
                setIsBuyMethodModalOpen(false);
              }}
            >
              <Ionicons name={'close-outline'} size={34} color={Colors.white} />
            </TouchableOpacity>
            <Button
              text="Use Contracts to buy"
              onPress={() => {
                dispatch(setBuyMethod(BuyMethod.CONTRACT));
                setIsBuyMethodModalOpen(false);
              }}
              size={ButtonSize.small}
              containerStyle={styles.buyMethodContractButton}
            />
            <Button
              text="Use USD to buy"
              onPress={() => {
                dispatch(setBuyMethod(BuyMethod.USD));
                setIsBuyMethodModalOpen(false);
              }}
              size={ButtonSize.small}
              buttonColor={Colors.orange500}
              containerStyle={styles.buyMethodUSDButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HeaderContent;
