import React from 'react';
import { Alert, StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Header, Input, Title } from '#/components';
import theme from '#/styles/theme.style';

import { AuthContext } from '#/lib/contexts';
import { postUserRegister } from '#/lib/actions';

const DEBUG = true;

class RegistrationScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        name: (DEBUG && 'John') || '',
        surname: (DEBUG && 'Doe') || '',
        email: (DEBUG && 'john.doe@qrder.tech') || '',
        phoneNumber: (DEBUG && '555 55 05') || '',
        username: (DEBUG && 'john.doe') || '',
        password: (DEBUG && '1234') || '',
        passwordAgain: (DEBUG && '1234') || '',
      }
    };
  }

  _onChange = (text, name) => {
    const { credentials } = this.state;
    this.setState({
      credentials: {
        ...credentials,
        [name]: text
      }
    });
  };

  _register = () => {
    const { credentials } = this.state;
    const {
      name,
      surname,
      email,
      phoneNumber,
      username,
      password,
      passwordAgain,
    } = credentials;

    if (password !== passwordAgain) {
      Alert.alert(
        "Registration Failed",
        "Passwords should match",
        [
          { text: "OK" }
        ],
        { cancelable: true }
      );
      return;
    }

    const data = { name, surname, email, phoneNumber, username, password };

    postUserRegister(data)
      .then(async (payload) => {
        const { signIn } = this.context;
        signIn({ username, password });
      })
      .catch((err) => {
        Alert.alert(
          "Registration Failed",
          err.data && err.data.msg || "Unknown error. Please try later!",
          [
            { text: "OK" }
          ],
          { cancelable: true }
        );
      });
  };

  render() {
    const { credentials } = this.state;
    return (
      <DefaultLayout style={styles.wrapper}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="height"
        >
          <Header style={styles.header}>
            <Title style={styles.title}>Sign Up</Title>
          </Header>

          <View style={styles.inputWrapper}>
            <Input
              iconName="male"
              name="name"
              onChangeText={(text) => this._onChange(text, "name")}
              placeholder="Name"
              style={styles.input}
              value={credentials && credentials.name}
            />
            <Input
              iconName="canadian-maple-leaf"
              name="surname"
              onChangeText={(text) => this._onChange(text, "surname")}
              placeholder="Surname"
              style={styles.input}
              value={credentials && credentials.surname}
            />
            <Input
              iconName="envelope"
              name="email"
              onChangeText={(text) => this._onChange(text, "email")}
              placeholder="Email"
              style={styles.input}
              value={credentials && credentials.email}
            />
            <Input
              iconName="mobile-alt"
              name="phoneNumber"
              onChangeText={(text) => this._onChange(text, "phoneNumber")}
              placeholder="Phone Number"
              style={styles.input}
              value={credentials && credentials.phoneNumber}
            />
            <Input
              iconName="user-alt"
              name="username"
              onChangeText={(text) => this._onChange(text, "username")}
              placeholder="Username"
              style={styles.input}
              value={credentials && credentials.username}
            />
            <Input
              iconName="key"
              name="password"
              onChangeText={(text) => this._onChange(text, "password")}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              value={credentials && credentials.password}
            />
            <Input
              iconName="key"
              name="passwordAgain"
              onChangeText={(text) => this._onChange(text, "passwordAgain")}
              placeholder="Password (Again)"
              secureTextEntry
              style={styles.input}
              value={credentials && credentials.passwordAgain}
            />
          </View>
        </KeyboardAvoidingView>

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
    height: '25%',
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
