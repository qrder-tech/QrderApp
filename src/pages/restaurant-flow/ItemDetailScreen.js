import React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Footer } from '#/components';
import theme from '#/styles/theme.style';

import { getUserMe } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

class ItemDetailScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    const { data } = route.params;
    this.setState({ data });
  }

  _paymentDone = () => {
    const { paymentDone } = this.context;
    paymentDone();
  };

  render() {
    const { data } = this.state;
    return (
      <DefaultLayout type="restaurant">
        <View style={styles.wrapper}>
          <Text>{this.props.route.name}</Text>
          {data &&
            Object.keys(data).map((key) => (
              <View key={key} style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', flex: 1 }}>{key}:</Text>
                <Text style={{ flex: 2 }}>{data[key]}</Text>
              </View>
            ))}
        </View>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    padding: 16,
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

export default ItemDetailScreen;
