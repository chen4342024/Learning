import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Button,
    Animated
} from 'react-native'

import LogoTitle from '../components/LogoTitle'

class AnimatedScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            title: '动画',
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor
        }
    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.view}>
                <FadeInView style={styles.fadeInView}>
                    <Text style={styles.fadeInText}>Fade In</Text>
                </FadeInView>

            </View>
        )
    }
}

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),
        rotateZ: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 3000
            }),
            Animated.timing(this.state.rotateZ, {
                toValue: 200,
                duration: 3000
            })
        ]).start()
    }

    render() {
        let { fadeAnim, rotateZ } = this.state
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,
                    transform: [
                        {
                            rotateZ: rotateZ.interpolate({
                                inputRange:[1,200],
                                outputRange:['0deg','360deg']
                            })
                        }
                    ]
                }}
            >
                {this.props.children}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fadeInView: {
        width: 250,
        height: 50,
        backgroundColor: 'powderblue'
    },

    fadeInText: {
        fontSize: 28,
        textAlign: 'center',
        margin: 10
    }
})

export default AnimatedScreen
