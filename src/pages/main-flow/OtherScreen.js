import React from 'react';
import { StyleSheet, View, } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, NavigationItem } from '#/components';

import { getUserMe } from '#/lib/actions';
import { AuthContext } from '#/lib/contexts';

class OtherScreen extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  _signOut = () => {
    const { signOut } = this.context;
    signOut();
  }

  _goTo = (page) => {
    const { navigation } = this.props;
    navigation.navigate(page);
  };

  render() {
    const { } = this.state;

    return (
      <DefaultLayout loading={false} type="restaurant">
        <View style={styles.wrapper}>
          <NavigationItem iconName="user-alt" title="My Info" callback={() => this._goTo("My Info")} />
          <NavigationItem iconName="history" title="Previous Orders" callback={() => this._goTo("Previous Orders")} />
          <NavigationItem iconName="star" title="Favourites" callback={() => this._goTo("Favourites")} />
          <NavigationItem iconName="search" title="Nearby Restaurants" callback={() => this._goTo("Nearby Restaurants")} />
          <NavigationItem iconName="wallet" title="Wallet" callback={() => this._goTo("Wallet")} />
        </View>
        <Footer>
          <Button
            onPress={() => this._signOut()}
            title="logout"
          />
        </Footer>
      </DefaultLayout >
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default OtherScreen;
