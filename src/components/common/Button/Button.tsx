import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ButtonProps, ButtonSize } from './types';

const Button: React.FC<ButtonProps> = ({ text, onPress, buttonColor, size, textColor, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          size === ButtonSize.small
            ? styles.smallContainer
            : size === ButtonSize.big
            ? styles.bigContainer
            : styles.normalContainer,
          buttonColor ? { backgroundColor: buttonColor } : undefined,
          containerStyle,
        ]}
      >
        <Text
          style={[
            styles.textContent,
            size === ButtonSize.small ? styles.smallText : size === ButtonSize.big ? styles.bigText : styles.normalText,
            textColor ? { color: textColor } : undefined,
            textStyle,
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
