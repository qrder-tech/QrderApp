import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { Image } from '#/components';
import theme from '#/styles/theme.style';

import logo from '#/assets/images/guru.png';

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.logoWrapper}>
          <Image
            source={logo}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.SECONDARY_COLOR,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default SplashScreen;
