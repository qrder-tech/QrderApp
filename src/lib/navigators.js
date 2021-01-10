import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { AUTH_FLOW, MAIN_FLOW, RESTAURANT_FLOW, SplashScreen } from '../pages';

import { HeaderTitle } from '#/components';
import theme from '#/styles/theme.style';

const { LoginScreen, RegistrationScreen, WelcomeScreen } = AUTH_FLOW;
const { FavouritesScreen, HomeScreen, NearbyRestaurantsScreen, OrderHistoryScreen, OtherScreen, QRScreen, SettingsScreen, WalletScreen } = MAIN_FLOW;
const { BasketScreen, ItemDetailScreen, MenuScreen, PaymentScreen, RequestScreen } = RESTAURANT_FLOW;

const AuthStack = createStackNavigator();
const BasketStack = createStackNavigator();
const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const OrderHistoryStack = createStackNavigator();
const OtherStack = createStackNavigator();
const RequestStack = createStackNavigator();
const RestaurantStack = createStackNavigator();
const RestaurantTab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const iconName = {
  Basket: 'shopping-basket',
  Home: 'home',
  Menu: 'list-alt',
  Nearby: 'search',
  QR: 'qrcode',
  Other: 'bars',
  Orders: 'history',
  Requests: 'concierge-bell'
};

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Registration" component={RegistrationScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <MainStack.Navigator
    screenOptions={({ navigation, route }) => ({
      headerTintColor: theme.SECONDARY_COLOR,
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        elevation: 0,
      },
      headerTitleStyle: {
        textTransform: 'capitalize',
      },
      headerLeft: null,
      headerTitle: (props) => {
        const { children } = props;
        const { uuid, name } = children;
        return (<HeaderTitle title={name} />)
      },
      headerRight: null
      // headerRight: () => <IconButton name="list" onPress={() => navigation.toggleDrawer()} style={{ marginRight: 16 }} />
    })}>
    <MainStack.Screen name="Home" component={HomeScreen} />
  </MainStack.Navigator>
);

const MainTabNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => (
        <Icon color={color} name={iconName[route.name]} size={size} />
      ),
    })}
    tabBarOptions={{
      activeTintColor: theme.PRIMARY_COLOR,
      inactiveTintColor: theme.OUTLINE_BUTTON_COLOR,
      safeAreaInsets: {
        bottom: 0,
      },
      keyboardHidesTabBar: true,
      style: {
        backgroundColor: theme.SECONDARY_COLOR,
      },
    }}>
    <MainTab.Screen
      name="Home"
      component={MainNavigator}
    // options={{ tabBarButton: () => null }}
    />
    <MainTab.Screen
      name="Nearby"
      component={NearbyRestaurantsScreen}
    />
    <MainTab.Screen
      name="QR"
      component={QRScreen}
      options={{ tabBarVisible: false }}
    />
    <MainTab.Screen
      name="Orders"
      component={OrderHistoryNavigator}
    />
    <MainTab.Screen
      name="Other"
      component={OtherNavigator}
    />
  </MainTab.Navigator>
);

const OrderHistoryNavigator = () => (
  <OrderHistoryStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: theme.SECONDARY_COLOR,
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        elevation: 3,
      },
      headerTitleStyle: {
        textTransform: 'capitalize',
      }
    }}>
    <OrderHistoryStack.Screen name="Previous Orders" component={OrderHistoryScreen} />
  </OrderHistoryStack.Navigator>
);

const OtherNavigator = () => (
  <OtherStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: theme.SECONDARY_COLOR,
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        elevation: 3,
      },
      headerTitleStyle: {
        textTransform: 'capitalize',
      }
    }}>
    <OtherStack.Screen name="Other" component={OtherScreen} />
    <OtherStack.Screen name="My Info" component={SettingsScreen} />
    <OtherStack.Screen name="Previous Orders" component={OrderHistoryScreen} />
    <OtherStack.Screen name="Favourites" component={FavouritesScreen} />
    <OtherStack.Screen name="Nearby Restaurants" component={NearbyRestaurantsScreen} />
    <OtherStack.Screen name="Wallet" component={WalletScreen} />
  </OtherStack.Navigator>
);

const RestaurantNavigator = () => (
  <RestaurantStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: theme.SECONDARY_COLOR,
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        elevation: 3,
      },
      headerTitleStyle: {
        textTransform: 'capitalize',
      }
    }}>
    <RestaurantStack.Screen name="Menu" component={MenuScreen} />
    <RestaurantStack.Screen name="Item Details" component={ItemDetailScreen} />
  </RestaurantStack.Navigator>
);

const BasketNavigator = () => (
  <BasketStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: theme.SECONDARY_COLOR,
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        elevation: 3,
      },
      headerTitleStyle: {
        textTransform: 'capitalize',
      }
    }}>
    <BasketStack.Screen name="Basket" component={BasketScreen} />
  </BasketStack.Navigator>
);

const RequestNavigator = () => (
  <RequestStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: theme.SECONDARY_COLOR,
      headerStyle: {
        backgroundColor: theme.PRIMARY_COLOR,
        elevation: 3,
      },
      headerTitleStyle: {
        textTransform: 'capitalize',
      }
    }}>
    <RequestStack.Screen name="Requests" component={RequestScreen} />
    <RequestStack.Screen name="Payment" component={PaymentScreen} />
  </RequestStack.Navigator>
);

const RestaurantTabNavigator = ({ basketSize, activeOrder, restaurant }) => (
  <RestaurantTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => (
        <Icon color={color} name={iconName[route.name]} size={size} />
      ),
    })}
    tabBarOptions={{
      activeTintColor: theme.PRIMARY_COLOR,
      inactiveTintColor: theme.OUTLINE_BUTTON_COLOR,
      keyboardHidesTabBar: true,
      style: {
        backgroundColor: theme.SECONDARY_COLOR,
      }
    }}>
    <RestaurantTab.Screen name="Menu" component={RestaurantNavigator} />
    <RestaurantTab.Screen
      name="Basket"
      component={BasketNavigator}
      options={{ tabBarBadge: basketSize || null }}
    />

    {
      activeOrder && <RestaurantTab.Screen name="Requests" component={RequestNavigator} />
    }
  </RestaurantTab.Navigator>
);

const RootNavigator = ({ loading, token, user, qr, restaurant, basketSize, activeOrder }) => (
  <RootStack.Navigator headerMode="none">
    {loading ? (
      <RootStack.Screen name="Splash" component={SplashScreen} />
    ) : !token ? (
      <RootStack.Screen name="Auth" component={AuthNavigator} />
    ) : !qr ? (
      <RootStack.Screen name="App" component={MainTabNavigator} />
    ) : (
            <RootStack.Screen name="Restaurant">
              {props => (<RestaurantTabNavigator {...props} basketSize={basketSize} activeOrder={activeOrder} restaurant={restaurant} />)}
            </RootStack.Screen>
          )}
  </RootStack.Navigator>
);

export default RootNavigator;
