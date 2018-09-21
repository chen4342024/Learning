/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import moviesJson from './app/json/MoviesExample.json';

const TabBarComponent = (props) => (<View><Text>123123</Text></View>);

type Props = {};
class App extends Component<Props> {
  constructor(props) {
    super(props); //这一句不能省略，照抄即可
    this.state = {
      data: [],
      loaded: false,
      refreshing: false
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    setTimeout(() => {
      this.setState({
        data: this.state.data.concat(moviesJson.movies),
        loaded: true,
        refreshing: false
      });
    }, 2000);
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>正在加载电影数据……</Text>
      </View>
    );
  }

  renderMovie(res) {
    let { item: movie } = res;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: movie.posters.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  keyExtractor(item, index) {
    return index + '';
  }

  onRefresh = () => {
    console.log('on refresh');
    this.setState({ refreshing: true });
    this.fetchData();
  };

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.app}>
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderMovie}
          style={styles.list}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: 20
  },
  list: {
    backgroundColor: '#F5FCFF'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 20
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

let options = {
  tabBarButtonComponent: props =>(<TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />)
};
export default createBottomTabNavigator({
  App: App,
  HomeScreen: HomeScreen,
},options);