import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Header, Input, Title } from '#/components';
import theme from '#/styles/theme.style';

import { AuthContext } from '#/lib/contexts';
import { postUserRegister } from '#/lib/actions';

const DEBUG = false;

class RegistrationScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { credentials: {} };
  }

  componentDidMount() {
    this.setState({
      credentials: {
        name: DEBUG && 'John',
        surname: DEBUG && 'Doe',
        email: DEBUG && 'john.doe@qrder.tech',
        username: DEBUG && 'john.doe',
        password: DEBUG && 'dummypassword',
        passwordAgain: DEBUG && 'dummypassword',
      },
    });
  }

  _onChangeText = (name, text) => {
    this.setState({ credentials: { [name]: text } });
    console.log(this.state);
  };

  _register = () => {
    const { credentials } = this.state;
    const {
      name,
      surname,
      email,
      username,
      password,
      passwordAgain,
    } = credentials;

    if (password !== passwordAgain) {
      console.warn('passwords should match!');
      return;
    }

    const data = { name, surname, email, username, password };
    console.log(data);
    postUserRegister(data)
      .then(async (payload) => {
        console.log(payload);

        if (payload) {
          const { signIn } = this.context;
          signIn({ username, password });
        }
      })
      .catch((err) => {
        console.warn(err.data);
      });
  };

  render() {
    const { credentials } = this.state;
    return (
      <DefaultLayout style={styles.wrapper}>
        <Header style={styles.header}>
          <Title style={styles.title}>Sign Up</Title>
        </Header>
        <View style={styles.inputWrapper}>
          <Input
            iconName="male"
            name="name"
            onChangeText={this._onChangeText}
            placeholder="Name"
            style={styles.input}
            value={credentials.name}
          />
          <Input
            iconName="canadian-maple-leaf"
            name="surname"
            onChangeText={this._onChangeText}
            placeholder="Surname"
            style={styles.input}
            value={credentials.surname}
          />
          <Input
            iconName="envelope"
            name="email"
            onChangeText={this._onChangeText}
            placeholder="Email"
            style={styles.input}
            value={credentials.email}
          />
          <Input
            iconName="user-alt"
            name="username"
            onChangeText={this._onChangeText}
            placeholder="Username"
            style={styles.input}
            value={credentials.username}
          />
          <Input
            iconName="key"
            name="password"
            onChangeText={this._onChangeText}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={credentials.password}
          />
          <Input
            iconName="key"
            name="passwordAgain"
            onChangeText={this._onChangeText}
            placeholder="Password (Again)"
            secureTextEntry
            style={styles.input}
            value={credentials.passwordAgain}
          />
        </View>

        <Footer>
          <Button onPress={() => this._register()} title="register" />
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
});

export default RegistrationScreen;
