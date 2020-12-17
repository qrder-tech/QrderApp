import React from 'react';
import { StyleSheet, View } from 'react-native';

const Header = (props) => {
  const { children, style } = props;

  return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    margin: 0,
    // backgroundColor: 'rgba(70, 70, 70, 0.2)',
  },
});

export default Header;
