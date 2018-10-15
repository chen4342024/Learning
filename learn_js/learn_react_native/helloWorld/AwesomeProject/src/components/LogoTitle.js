import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.title}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 30, height: 30 }}
        />
        <Text>test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    //   flex: 1,
    //   paddingTop: 20
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'space-between'
  }
});

export default LogoTitle;
