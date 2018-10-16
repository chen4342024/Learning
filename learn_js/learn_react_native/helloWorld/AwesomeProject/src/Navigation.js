import {
    createBottomTabNavigator,
    BottomTabBar,
    createStackNavigator
} from 'react-navigation'

import HomeScreen from './pages/HomeScreen'
import DetailScreen from './pages/DetailScreen'
import ModalScreen from './pages/ModalScreen'
import App from './pages/AppScreen'
import AnimatedScreen from './pages/AnimatedScreen'

const TabBarComponent = props => (
    <View>
        <Text> 123123 </Text>{' '}
    </View>
)

let options = {
    // tabBarButtonComponent: props => (
    //     <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    // ),
    initialRouteName: 'HomeScreen',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }
}

const MainStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
        DetailScreen: {
            screen: DetailScreen
        },
        AnimatedScreen: AnimatedScreen
    },
    options
)

MainStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible
    }
}

const TabsStack = createBottomTabNavigator({
    App: App,
    Main: MainStack
},{
    initialRouteName: 'Main',
})

const RootStack = createStackNavigator(
    {
        Tabs: {
            screen: TabsStack
        },
        MyModal: {
            screen: ModalScreen
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
)

export default RootStack
