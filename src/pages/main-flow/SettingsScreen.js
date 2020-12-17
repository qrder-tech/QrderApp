import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Header, Image, Text, Input } from '#/components';

import { getUserMe } from '#/lib/actions';
import { AuthContext } from '#/lib/contexts';

class SettingsScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { loading: true, user: null };

    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      this._getUser();
    });
  }

  componentDidMount() {
    this._getUser();
  }

  _getUser = () => {
    getUserMe()
      .then((payload) => {
        this.setState({ loading: false, user: payload });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  _saveUser = () => {

  }

  render() {
    const { loading, user } = this.state;

    return (
      <DefaultLayout loading={loading}>
        <View style={styles.inputWrapper}>
          <Input
            iconName="male"
            name="name"
            placeholder="Name"
            value={user && user.name}
            style={styles.input}
          />
          <Input
            iconName="canadian-maple-leaf"
            name="surname"
            placeholder="Surname"
            value={user && user.surname}
            style={styles.input}
          />
          <Input
            iconName="envelope"
            name="email"
            placeholder="Email"
            value={user && user.email}
            style={styles.input}
          />
          <Input
            iconName="user-alt"
            name="username"
            placeholder="Username"
            value={user && user.username}
            style={styles.input}
          />
          <Input
            iconName="key"
            name="password"
            placeholder="Password"
            value={"dummypassword"}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
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
    alignItems: 'center',
    paddingHorizontal: '15%',
    // backgroundColor: '#959896'
  },
  input: {
    marginTop: 48,
    // backgroundColor: 'rgba(70, 70, 70, 0.2)'
  },
});

export default SettingsScreen;
