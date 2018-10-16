import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Button
} from 'react-native'
import LogoTitle from '../components/LogoTitle'

function noop() {}

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            //   header: <LogoTitle />,
            headerTitle: <LogoTitle />,
            headerLeft: <LogoTitle />,
            headerRight: (
                <Button
                    onPress={navigation.getParam('increaseCount') || noop}
                    title="+1"
                    color="#fff"
                />
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount })
    }

    state = {
        count: 0
    }

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        const { navigation } = this.props
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Home!</Text>
                <Text>Count: {this.state.count}</Text>
                <Button
                    title="Go to Details"
                    onPress={() =>
                        navigation.push('DetailScreen', { test: '1123123123' })
                    }
                />
                <Button
                    title="Go to Animated"
                    onPress={() =>
                        navigation.push('AnimatedScreen', {
                            test: '1123123123'
                        })
                    }
                />
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="Open MyModal"
                />
            </View>
        )
    }
}

export default HomeScreen
