import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { DefaultLayout } from '#/layouts';
import theme from '#/styles/theme.style';

import { RestaurantContext } from '#/lib/contexts';

const DUMMY_QR_DATA = {
  restaurantUuid: '56bc78e9-05fd-454c-99ad-18d479aa8ad9',
  restaurantUuid: 'b239690e-dfa1-4c6b-9e19-45c182d2b66b',
  tableUuid: '005dd3a6-a892-4473-94eb-87fdfc167e5d',
};

class QRScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { readQr } = this.context;
    readQr(DUMMY_QR_DATA);
  }

  _onRead = (payload) => {
    const qr = payload.data.split(':');

    const data = {
      restaurantUuid: qr[0],
      tableUuid: qr[1]
    };

    const { readQr } = this.context;
    readQr(data);
  };

  render() {
    return (
      <DefaultLayout type="restaurant">
        <QRCodeScanner
          onRead={this._onRead}
          flashMode={RNCamera.Constants.FlashMode.off}
          reactivate={true}
          reactivateTimeout={1000}
          showMarker={true}
          topViewStyle={{ flex: 0 }}
          bottomViewStyle={{ flex: 0 }}
          cameraStyle={{ height: Dimensions.get('window').height }}
          markerStyle={{ borderColor: theme.PRIMARY_COLOR }}
        />
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    paddingHorizontal: 48,
    paddingVertical: 16,
  },
  inputWrapper: {
    flex: 1,
    width: '100%',
    // height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#959896'
  },
  input: {
    marginBottom: 8,
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#858886',
  },
  forget: {
    color: theme.PRIMARY_BUTTON_COLOR,
    textAlign: 'right',
  },
});

export default QRScreen;
