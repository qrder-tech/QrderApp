import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  HomeScreen,
  LoginScreen,
  QRScreen,
  RegistrationScreen,
  SplashScreen
} from '../pages';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Registration" component={RegistrationScreen} />
  </AuthStack.Navigator>
);

const iconName = {
  'Home': 'home',
  'QR': 'qrcode'
}

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => (
        <Icon color={color} name={iconName[route.name]} size={size} />
      )
    })}

    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarButton: () => null }} />
    <Tab.Screen name="QR" component={QRScreen} options={{ tabBarVisible: false }} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TabNavigator} />
  </Drawer.Navigator>
);

const RootNavigator = ({ loading, token }) => (
  <RootStack.Navigator headerMode="none">
    {
      loading ?
        <RootStack.Screen
          name="Splash"
          component={SplashScreen}
        />
        :
        !token ?
          <RootStack.Screen
            name="Auth"
            component={AuthNavigator} />
          :
          <RootStack.Screen
            name="App"
            component={DrawerNavigator}
          />
    }
  </RootStack.Navigator>
);

export default RootNavigator;