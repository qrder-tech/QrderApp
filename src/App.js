import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import RootNavigator from '#/lib/navigators';
import { AuthProvider, RestaurantProvider } from '#/lib/contexts';
import { authReducer, restaurantReducer } from '#/lib/reducers';
import { getHealth } from '#/lib/actions';

import theme from '#/styles/theme.style';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: theme.PRIMARY_COLOR,
    background: theme.PRIMARY_BACKGROUND_COLOR,
  },
};

function App() {
  const [stateAuth, dispatchAuth] = React.useReducer(authReducer, {
    loading: true,
    token: null,
  });

  const [stateRestaurant, dispatchRestaurant] = React.useReducer(restaurantReducer, {
    loading: true,
    qr: null,
    restaurant: null,
    basketSize: 0,
    activeOrder: false,
  });

  // TODO: add restaurant state & dispatch

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        // await getHealth();
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatchAuth({ type: 'RESTORE_TOKEN', token });
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthProvider dispatch={dispatchAuth}>
      <RestaurantProvider dispatch={dispatchRestaurant}>
        <NavigationContainer theme={MyTheme}>
          <RootNavigator
            loading={stateAuth.loading}
            token={stateAuth.token}
            user={stateAuth.user}
            qr={stateRestaurant.qr}
            restaurant={stateRestaurant.restaurant}
            basketSize={stateRestaurant.basketSize}
            activeOrder={stateRestaurant.activeOrder}
          />
        </NavigationContainer>
      </RestaurantProvider>
    </AuthProvider>
  );
}

export default App;
