import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Image, Footer, Header, Title } from '#/components';
import theme from '#/styles/theme.style';

import undrawOnlineGroceries from '#/assets/images/undraw_online_groceries_a02y.png';

class WelcomeScreen extends React.Component {
  _goTo = (page) => {
    const { navigation } = this.props;
    navigation.navigate(page);
  };

  render() {
    return (
      <DefaultLayout style={styles.wrapper}>
        <Header style={styles.header}>
          <Image source={undrawOnlineGroceries} />
        </Header>

        <View style={styles.titleWrapper}>
          <Title type="h2">Are you hungry?</Title>
          <Title type="h4" style={{ textTransform: 'none' }}>{"Welcome to the Qrder App. A Platform that Manages Your Orders in the Restaurants."}</Title>
        </View>

        <Footer style={styles.footer}>
          <Button
            onPress={() => this._goTo('Login')}
            title="Login"
            size="small"
          />

          <Button
            onPress={() => this._goTo('Registration')}
            title="Register"
            size="small"
            type="outline"
          />
        </Footer>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '50%',
  },
  titleWrapper: {
    flex: 1,
    // backgroundColor: 'rgba(70, 70, 70, 0.2)'
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  footer: {
    justifyContent: 'space-between',
  },
});

export default WelcomeScreen;
