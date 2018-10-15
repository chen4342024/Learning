import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button
} from 'react-native';

import LogoTitle from './LogoTitle';

class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.getParam('test', 'A Nested Details Screen'),
      headerTitle: <LogoTitle />,
      // headerLeft: <LogoTitle />,
      headerTruncatedBackTitle: `to A`,
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>DetailScreen!</Text>
        <Text>{navigation.getParam('test', 'NO-ID')}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.push('DetailScreen')}
        />
      </View>
    );
  }
}

export default DetailScreen;
