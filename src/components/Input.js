import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  const { name, onChangeText } = props;

  return (
    <TextInput
      {...props}
      style={[styles.wrapper, props.style]}
      onChangeText={text => onChangeText(name, text)}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderBottomWidth: 1,
    //borderRadius: 16,
    //borderWidth: 1,
    //margin: 16,
    padding: 8,
    //backgroundColor: '#b5b8b6',
  }
});

export default Input;