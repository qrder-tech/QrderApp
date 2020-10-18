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

import { AuthContext } from '../lib/utils';
import { postUserRegister } from '../lib/actions';

class RegistrationScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { credentials: {} };
  }

  componentDidMount() {
    this.setState({
      credentials: {
        name: 'app',
        surname: 'test',
        email: 'test_app@hotmail.com',
        username: 'test_app',
        password: 'test',
        passwordAgain: 'test'
      }
    });
  }

  _onChangeText = (name, text) => {
    this.state.credentials[name] = text;
    console.log(this.state);
  }

  _register = () => {
    const { credentials } = this.state;
    const {
      name,
      surname,
      email,
      username,
      password,
      passwordAgain
    } = credentials;

    if (password !== passwordAgain) {
      console.warn("passwords should match!");
      return;
    }

    const data = { name, surname, email, username, password };
    console.log(data);
    postUserRegister(data).then(async payload => {
      console.log(payload);

      if (payload) {
        this.context.signIn({ username, password });
      }
    }).catch(err => {
      console.warn(err.data);
    });
  }

  render() {
    const { credentials } = this.state
    return (
      <Container>
        <View style={styles.wrapper}>
          <View style={styles.inputWrapper}>
            <Input name='name' placeholder='name' onChangeText={this._onChangeText} style={styles.input} value={credentials.name} />
            <Input name='surname' placeholder='surname' onChangeText={this._onChangeText} style={styles.input} value={credentials.surname} />
            <Input name='email' placeholder='email' onChangeText={this._onChangeText} style={styles.input} value={credentials.email} />
            <Input name='username' placeholder='username' onChangeText={this._onChangeText} style={styles.input} value={credentials.username} />
            <Input name='password' placeholder='password' onChangeText={this._onChangeText} secureTextEntry value={credentials.password} />
            <Input name='passwordAgain' placeholder='password (again)' onChangeText={this._onChangeText} secureTextEntry value={credentials.passwordAgain} />
          </View>

          <View style={styles.buttonWrapper}>
            <Button color={theme.PRIMARY_BUTTON_COLOR} onPress={() => this._register()} title='register' />
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

export default RegistrationScreen;