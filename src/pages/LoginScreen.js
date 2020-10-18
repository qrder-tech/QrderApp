import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import { Container, Input } from '../components';
import theme from '../styles/theme.style';

import { AuthContext } from '../lib/utils';

class LoginScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { credentials: { username: null, password: null } };
  }

  componentDidMount() {
    this.setState({ credentials: { username: 'postman', password: 'postman' } });
  }

  _login = (username, password) => this.context.signIn({ username, password });

  _goTo = (page) => {
    const { navigate } = this.props.navigation;
    navigate(page);
  }

  render() {
    const { credentials } = this.state;
    return (
      <Container>
        <View style={styles.wrapper}>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }} />
          </View>

          <View style={styles.inputWrapper}>
            <Input name="username" style={{ marginBottom: 8 }} placeholder='username' value={credentials.username} />
            <Input name="password" placeholder='password' value={credentials.password} />
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableHighlight
              underlayColor={null}
              activeOpacity={0.6}
            >
              <Text style={styles.forget}>Forget password?</Text>
            </TouchableHighlight>
            <Button
              onPress={() => this._login(credentials.username, credentials.password)}
              style={styles.button}
              color={theme.PRIMARY_BUTTON_COLOR}
              title='login'
            />
          </View>

          <View style={styles.footer}>
            <TouchableHighlight
              onPress={() => this._goTo('Registration')}
              underlayColor={null}
              activeOpacity={0.6}
            >
              <Text style={styles.signUp}>Don't have an account? Sign up</Text>
            </TouchableHighlight>
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
    //height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    //backgroundColor: '#959896',
  },
  linkWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonWrapper: {
    flex: 1,
    //justifyContent: 'space-between',
    width: '100%',
    //backgroundColor: '#858886',
  },
  button: {
  },
  forget: {
    marginBottom: 16,
    color: theme.PRIMARY_BUTTON_COLOR,
    textAlign: 'right'
  },
  signUp: {
    color: theme.PRIMARY_BUTTON_COLOR,
    textAlign: 'center'
  },
  footer: {
    alignItems: 'center'
    //backgroundColor: '#959896'
  }
});

export default LoginScreen;