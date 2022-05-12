import React from 'react';
import { View } from 'react-native';
import { updateTicker } from '../../api';
import { getAvailableTickers } from '../../utils';
import { Chip } from '../common/Chip';
import { TextInputWithTitle } from '../common/TextInputWithTitle.tsx';
import { styles } from './styles';
import { HeaderContentProps } from './types';
import { useAppSelector, useAppDispatch, setContractAmtUSD } from '../../store';
import { selectTicker, setTicker } from '../../store';

const HeaderContent: React.FC<HeaderContentProps> = ({}) => {
  // The `state` arg is correctly typed as `RootState` already
  const selectedTicker = useAppSelector(selectTicker);
  const dispatch = useAppDispatch();

  const availableTickers = getAvailableTickers();
  const renderChipsRow = () => {
    return (
      <View style={styles.chipContainer}>
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
      </View>
    );
  };

  const renderTextInputs = () => {
    return (
      <TextInputWithTitle
        onChangeValue={(newValue) => {
          console.log('## newValue:', newValue);
          dispatch(setContractAmtUSD(newValue));
        }}
        titleText="USD to buy:"
        placeholder="1000"
      />
    );
  };
  return (
    <View style={styles.container}>
      {renderChipsRow()}
      {renderTextInputs()}
    </View>
  );
};

export default HeaderContent;
