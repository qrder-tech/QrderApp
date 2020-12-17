import React from 'react';
import { StyleSheet, View } from 'react-native';

const Footer = (props) => {
  const { children, style } = props;

  return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Footer;
