import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>By continuing you agree to:</Text>

      <View style={styles.linkWrapper}>
        <Text style={styles.link}>Privacy Policy</Text>
        <Text style={styles.link}>Terms & Conditions</Text>
        <Text style={styles.link}>Content Policy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    //flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
  },
  linkWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'grey',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'darkgrey',
  }
});

export default Footer;