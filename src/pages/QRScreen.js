import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { Container, Footer, Input } from '../components';
import theme from '../styles/theme.style';

import { getUserMe } from '../lib/actions';
import { AuthContext } from '../lib/utils';


class QRScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.warn("qr reader");
  }

  _onRead = payload => {
    console.warn(payload.data);
  }

  render() {
    return (
      <Container>
        <QRCodeScanner
          onRead={this._onRead}
          flashMode={RNCamera.Constants.FlashMode.off}
          reactivate={true}
          reactivateTimeout={1000}
          showMarker={true}
          topViewStyle={{ flex: 0 }}
          bottomViewStyle={{ flex: 0 }}
          cameraStyle={{ height: Dimensions.get('window').height }}
        />
      </Container>
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
    //height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#959896'
  },
  input: {
    marginBottom: 8
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#858886',
  },
  forget: {
    color: theme.PRIMARY_BUTTON_COLOR,
    textAlign: 'right'
  }
});

export default QRScreen;