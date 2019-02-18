import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import TransferWidget from './src/screens/TransferWidget';
import Profile from './src/screens/Profile';
import TransferList from './src/components/transfers/Listing';

const StackNavigator = createStackNavigator(
  {
    TransferWidget: {
      screen: TransferWidget,
      key: 'transferWidgetScreen',
      navigationOptions: {
        title: 'Receptivo Colombia - Traslados'
      }
    },
    Profile: {
      screen: Profile,
      key: 'profileScreen',
      navigationOptions: {
        title: 'Perfil'
      }
    },

    TransferList: {
      screen: TransferList,
      navigationOptions: {
        key: 'transferListScreen',
        title: 'Lista de Traslados'
      }
    }
  },

  {
    // other settings
  }
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: StackNavigator,
      key: 'stackNavigatorScreen',
      navigationOptions: () => ({
            title: 'Traslados',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name='car'
                    color={tintColor}
                    size={20}
                />
            )
        })
    },
    Profile: {
      screen: Profile,
      key: 'profileStackNavigatorScreen',
      navigationOptions: () => ({
            title: 'Perfil',
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name='user'
                    color={tintColor}
                    size={20}
                />
            )
        })
    }
  },

  {
    initialRouteName: 'Home',
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    barStyle: { backgroundColor: '#fff' },

  }
);

const Stack = createAppContainer(StackNavigator);
const BottomTab = createAppContainer(TabNavigator);

// export default BottomTab;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    this.setState({
      isLoaded: true
    });
    SplashScreen.hide();
  }

  renderLoading = () => <ActivityIndicator />;

  renderApp = () => <BottomTab />;

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}
