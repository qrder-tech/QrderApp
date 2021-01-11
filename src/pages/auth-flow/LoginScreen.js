import React from 'react';
import { Alert, Text, StyleSheet, TouchableHighlight, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Header, Input, Title } from '#/components';
import theme from '#/styles/theme.style';

import { AuthContext } from '#/lib/contexts';

class LoginScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { credentials: { username: null, password: null } };
  }

  componentDidMount() {
    this.setState({
      credentials: { username: 'postman', password: 'postman' },
    });
  }

  _login = (username, password) => {
    const { signIn } = this.context;
    signIn({ username, password });
  };

  _goTo = (page) => {
    const { navigation } = this.props;
    navigation.navigate(page);
  };

  _onChange = (text, name) => {
    const { credentials } = this.state;
    this.setState({
      credentials: {
        ...credentials,
        [name]: text
      }
    });
  };

  render() {
    const { credentials } = this.state;
    return (
      <DefaultLayout style={styles.wrapper}>
        <Header style={styles.header}>
          <Title style={styles.title}>Sign In</Title>
        </Header>

        <View style={styles.inputWrapper}>
          <Input
            iconName="user-alt"
            name="username"
            placeholder="username"
            style={styles.input}
            value={credentials.username}
            onChangeText={(e) => this._onChange(e, "username")}
          />
          <Input
            iconName="key"
            name="password"
            placeholder="password"
            style={styles.input}
            value={credentials.password}
            onChangeText={(e) => this._onChange(e, "password")}
            secureTextEntry
          />

          <TouchableHighlight
            underlayColor={null}
            activeOpacity={0.6}
            style={{ marginTop: 16, alignSelf: 'flex-end' }}>
            <Text style={styles.forget}>Forget password?</Text>
          </TouchableHighlight>
        </View>

        <Footer>
          <Button
            onPress={() =>
              this._login(credentials.username, credentials.password)
            }
            title="login"
          />
        </Footer>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.PRIMARY_COLOR
  },
  header: {
    height: '35%',
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'left',
  },
  inputWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: '#959896'
  },
  input: {
    marginTop: 8,
    // backgroundColor: 'rgba(70, 70, 70, 0.2)'
  },
  forget: {
    color: '#eee',
    textAlign: 'right',
  },
});

export default LoginScreen;
