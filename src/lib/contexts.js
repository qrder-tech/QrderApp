import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { postUserLogin } from './actions';

export const AuthContext = React.createContext();
export const RestaurantContext = React.createContext();
export const ThemeContext = React.createContext();

export const AuthProvider = (props) => {
  const { children, dispatch } = props;

  const memo = React.useMemo(
    () => ({
      signIn: async (data) => {
        postUserLogin(data)
          .then(async (payload) => {
            console.log(payload);

            if (payload.token) {
              await AsyncStorage.setItem('token', payload.token);
              dispatch({ type: 'SIGN_IN', token: payload.token });
            }
          })
          .catch((err) => {
            console.warn(err.data);
          });
      },
      signOut: async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
};

export const RestaurantProvider = (props) => {
  const { children, dispatch } = props;

  const memo = React.useMemo(
    () => ({
      readQr: async (data) => {
        await AsyncStorage.setItem('qr', JSON.stringify(data));
        await AsyncStorage.removeItem('basket');
        dispatch({ type: 'READ_QR', qr: data });
        // TODO: send rest request in here, instead of MenuScreen
      },
      leaveRestaurant: async () => {
        const order = await AsyncStorage.getItem('order');

        if (!order) {
          dispatch({ type: 'LEAVE_RESTAURANT' });
        }
      },
      paymentDone: async () => {
        await AsyncStorage.removeItem('qr');
        await AsyncStorage.removeItem('order');
        await AsyncStorage.removeItem('basket');
        dispatch({ type: 'PAYMENT_DONE' });
        dispatch({ type: 'UPDATE_ORDER', activeOrder: false });
      },
      updateBasket: async (data) => {
        await AsyncStorage.setItem('basket', JSON.stringify(data));
        dispatch({ type: 'UPDATE_BASKET', basketSize: data.length })
      },
      emptyBasket: async () => {
        await AsyncStorage.removeItem('basket');
        dispatch({ type: 'UPDATE_BASKET', basketSize: 0 })
      },
      getBasket: async () => {
        const basket = await AsyncStorage.getItem('basket');
        return await JSON.parse(basket);
      },
      saveOrder: async (uuid) => {
        await AsyncStorage.setItem('order', uuid);
        await AsyncStorage.removeItem('basket');
        dispatch({ type: 'UPDATE_ORDER', activeOrder: true });
      },
      getSavedOrder: async () => {
        return await AsyncStorage.getItem('order');
      }
    }),
    [],
  );

  return (
    <RestaurantContext.Provider value={memo}>
      {children}
    </RestaurantContext.Provider>
  );
};
