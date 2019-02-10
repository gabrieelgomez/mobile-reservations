import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation';

import TransferWidget from './src/screens/TransferWidget'
import Profile from './src/screens/Profile'
import TransferList from './src/components/lists/TransferList'

const StackNavigator = createStackNavigator(
  {
    TransferWidget: {
      screen: TransferWidget,
      key  : 'transferWidgetScreen',
      navigationOptions:{
        title: 'Receptivo Colombia - Traslados',
      }
    },
    Profile: {
      screen: Profile,
      key  : 'profileScreen',
      navigationOptions:{
        title: 'Perfil',
      }
    },

    TransferList: {
      screen: TransferList,
      navigationOptions:{
        key  : 'transferListScreen',
        title: 'Lista de Traslados',
      }
    },

  },

  {
    // other settings
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: StackNavigator,
      key  : 'stackNavigatorScreen',
      navigationOptions: {
        title: 'Inicio',
      }
    },
    Profile: {
      screen: Profile,
      key  : 'profileStackNavigatorScreen',
      navigationOptions:{
        title: 'Perfil',
      }
    },
  },

  {
    // other settings
  }
);

const Stack     = createAppContainer(StackNavigator);
const BottomTab = createAppContainer(TabNavigator);

// export default BottomTab;

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoaded: false }
  }

  componentDidMount(){
    this.setState({
      isLoaded: true
    });
  }

  renderLoading = () => (
    <ActivityIndicator />
  );

  renderApp = () => (
    <BottomTab />
  );

  render = () => (this.state.isLoaded ? this.renderApp() : this.renderLoading());
}
