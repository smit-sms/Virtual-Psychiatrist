import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

class Input extends Component {
  render() {
    const {
      label,
      style,
      keyboardType,
      maxLength,
      placeholder,
      placeholderTextColor,
      onChangeText,
      value,
      autoCapitalize,
      secureTextEntry,
      autoCorrect,
    } = this.props;
    return (
      <View>
        <TextInput
          style={styles.inputStyle}
          keyboardType={keyboardType}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          autoCorrect={autoCorrect}
        />
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    width: '85%',
    color: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: '#5CA08E',
    borderWidth: 1,
    fontFamily: 'Montserrat-Regular',
  },
};

export {Input};
