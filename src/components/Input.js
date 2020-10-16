import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
  return (
    <TextInput style={styles.wrapper} {...props} />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 16,
    borderBottomWidth: 1,
    borderWidth: 1,
    margin: 16,
    padding: 8,
    //backgroundColor: '#b5b8b6',
  }
});

export default Input;