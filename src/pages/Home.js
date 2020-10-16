import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { Container, Footer, Input } from '../components';

import theme from '../styles/theme.style';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.wrapper}>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }} />
          </View>
          <View style={styles.inputWrapper}>
            <Input placeholder='username' />
            <Input placeholder='password' />

            <View style={styles.buttonWrapper}>
              <Text style={styles.forget}>Forget password?</Text>
              <Button color={theme.PRIMARY_BUTTON_COLOR} title='login' />
            </View>
          </View>

          <Footer />
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
  },
  logoWrapper: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor: '#858886',
  },
  logo: {
    height: '75%',
    aspectRatio: 1,
    //backgroundColor: '#656866',
  },
  inputWrapper: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#959896'
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderWidth: 1,
    margin: 16,
    padding: 8,
    //backgroundColor: '#b5b8b6',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    //backgroundColor: '#858886',
  },
  forget: {
    color: theme.PRIMARY_BUTTON_COLOR,
    textAlign: 'right'
  }
});

export default Home;