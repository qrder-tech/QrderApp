import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import HomeScreen from './pages/HomeScreen';

import { AuthContext } from './lib/utils';
import { getHealth, postUserLogin } from './lib/actions';

import RootNavigator from './lib/navigators';

const Stack = createStackNavigator();

function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            loading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            token: null,
          };
      }
    },
    {
      loading: true,
      token: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        //await getHealth();
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      
      setTimeout(() => {
        console.warn('welcome');
        dispatch({ type: 'RESTORE_TOKEN', token });
      }, 1000);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        postUserLogin(data).then(async payload => {
          console.log(payload);

          if (payload.token) {
            await AsyncStorage.setItem('token', payload.token);
            dispatch({ type: 'SIGN_IN', token: payload.token });
          }
        }).catch(err => {
          console.warn(err.data);
        });
      },
      signOut: async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootNavigator loading={state.loading} token={state.token} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

/* 
<Stack.Navigator>
          {
            state.loading ? (
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            ) :
              state.token ? (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>
              ) : (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Registration" component={RegistrationScreen} />
                  </>
                )
          }
        </Stack.Navigator>
*/

export default App;