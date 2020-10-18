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

import { getUserMe } from '../lib/actions';
import { AuthContext } from '../lib/utils';


class HomeScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = () => {
    getUserMe().then(payload => {
      this.setState({ ...payload });
    }).catch(err => {
      console.warn(err);
    });
  }

  _signOut = () => this.context.signOut();

  render() {
    return (
      <Container>
        <View style={styles.wrapper}>
          <Text>Home Screen</Text>
          <Text>{JSON.stringify(this.state)}</Text>
          <Button
            onPress={() => this._signOut()}
            style={styles.button}
            color={theme.PRIMARY_BUTTON_COLOR}
            title='log out'
          />
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
  inputWrapper: {
    flex: 1,
    width: '100%',
    //height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#959896'
  },
  input: {
    marginBottom: 8
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#858886',
  },
  forget: {
    color: theme.PRIMARY_BUTTON_COLOR,
    textAlign: 'right'
  }
});

export default HomeScreen;