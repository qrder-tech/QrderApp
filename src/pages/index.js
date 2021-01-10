import LoginScreen from './auth-flow/LoginScreen';
import RegistrationScreen from './auth-flow/RegistrationScreen';
import WelcomeScreen from './auth-flow/WelcomeScreen';

import FavouritesScreen from './main-flow/FavouritesScreen';
import HomeScreen from './main-flow/HomeScreen';
import NearbyRestaurantsScreen from './main-flow/NearbyRestaurantsScreen';
import OrderHistoryScreen from './main-flow/OrderHistoryScreen';
import OtherScreen from './main-flow/OtherScreen';
import QRScreen from './main-flow/QRScreen';
import SettingsScreen from './main-flow/SettingsScreen';
import WalletScreen from './main-flow/WalletScreen';

import BasketScreen from './restaurant-flow/BasketScreen';
import ItemDetailScreen from './restaurant-flow/ItemDetailScreen';
import MenuScreen from './restaurant-flow/MenuScreen';
import PaymentScreen from './restaurant-flow/PaymentScreen';
import RequestScreen from './restaurant-flow/RequestScreen';

import SplashScreen from './SplashScreen';

const AUTH_FLOW = {
  LoginScreen,
  RegistrationScreen,
  WelcomeScreen,
};

const MAIN_FLOW = {
  FavouritesScreen,
  HomeScreen,
  NearbyRestaurantsScreen,
  OrderHistoryScreen,
  OtherScreen,
  QRScreen,
  SettingsScreen,
  WalletScreen,
};

const RESTAURANT_FLOW = {
  BasketScreen,
  ItemDetailScreen,
  MenuScreen,
  PaymentScreen,
  RequestScreen,
};
export { AUTH_FLOW, MAIN_FLOW, RESTAURANT_FLOW, SplashScreen };
