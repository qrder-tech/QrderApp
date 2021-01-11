import React from 'react';
import { Alert, StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Header, Image, Text, Input } from '#/components';

import { getUserMe, postUserMe } from '#/lib/actions';
import { AuthContext } from '#/lib/contexts';

class SettingsScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { loading: true, user: null, credentials: null };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      this._getUser();
    });
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

  _getUser = () => {
    getUserMe()
      .then((payload) => {
        delete payload.password;

        this.setState({
          loading: false,
          user: payload
        });
      })
      .catch((err) => {
        Alert.alert(
          "User Details Failed",
          err && err.msg || "Unknown error. Please try later!",
          [
            { text: "OK" }
          ],
          { cancelable: true }
        );
      });
  }

  _saveUser = () => {
    const { credentials } = this.state;

    if (!credentials) {
      return;
    }

    this.setState({ loading: true });

    postUserMe(credentials)
      .then((payload) => {
        this.setState({ loading: true });
        this._getUser();
      })
      .catch((err) => {
        this.setState({ loading: false });
        Alert.alert(
          "Update User Details Failed",
          err && err.msg || "Unknown error. Please try later!",
          [
            { text: "OK" }
          ],
          { cancelable: true }
        );
      });
  }

  render() {
    const { loading, user, credentials } = this.state;

    return (
      <DefaultLayout loading={loading}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="height"
        >
          <View style={styles.inputWrapper}>
            <Input
              iconName="male"
              name="name"
              onChangeText={(text) => this._onChange(text, "name")}
              placeholder="Name"
              value={(credentials && credentials.name) || (user && user.name) || ""}
              style={styles.input}
            />
            <Input
              iconName="canadian-maple-leaf"
              name="surname"
              onChangeText={(text) => this._onChange(text, "surname")}
              placeholder="Surname"
              value={(credentials && credentials.surname) || (user && user.surname) || ""}
              style={styles.input}
            />
            <Input
              iconName="envelope"
              name="email"
              onChangeText={(text) => this._onChange(text, "email")}
              placeholder="Email"
              value={(credentials && credentials.email) || (user && user.email) || ""}
              style={styles.input}
            />
            <Input
              iconName="mobile-alt"
              name="phoneNumber"
              onChangeText={(text) => this._onChange(text, "phoneNumber")}
              placeholder="Phone Number"
              value={(credentials && credentials.phoneNumber) || (user && user.phoneNumber) || ""}
              style={styles.input}
            />
            <Input
              iconName="user-alt"
              name="username"
              onChangeText={(text) => this._onChange(text, "username")}
              placeholder="Username"
              value={(credentials && credentials.username) || (user && user.username) || ""}
              style={styles.input}
            />
            <Input
              iconName="key"
              name="password"
              onChangeText={(text) => this._onChange(text, "password")}
              placeholder="Password"
              value={(credentials && credentials.password) || (user && user.password) || ""}
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
        </KeyboardAvoidingView>
        <Footer>
          <Button
            onPress={() => this._saveUser()}
            title="save"
          />
        </Footer>
      </DefaultLayout >
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '15%',
    // backgroundColor: '#959896'
  },
  input: {
    marginVertical: 14,
    // backgroundColor: 'rgba(70, 70, 70, 0.2)'
  },
});

export default SettingsScreen;
