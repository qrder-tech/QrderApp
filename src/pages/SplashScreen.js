import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { Container } from '../components';
import theme from '../styles/theme.style';


class SplashScreen extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.wrapper}>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }} />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    paddingHorizontal: 48,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: '75%',
    aspectRatio: 1,
  },
  logo: {
    flex: 1,
  }
});

export default SplashScreen;