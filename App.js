import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  BottomTabBar
} from 'react-navigation';

import TransferWidget from './src/screens/TransferWidget'
import Profile from './src/screens/Profile'
import TransferList from './src/screens/TransferList'

const StackNavigator = createStackNavigator(
  {
    TransferWidget: {
      screen: TransferWidget,
      navigationOptions:{
        title: 'Receptivo Colombia - Traslados'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions:{
        title: 'Perfil'
      }
    },

    TransferList: {
      screen: TransferList,
      navigationOptions:{
        title: 'Lista de Traslados'
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
      navigationOptions: {
        title: 'Inicio'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions:{
        title: 'Perfil'
      }
    },
  },

  {
    // other settings
  }
);

const Stack     = createAppContainer(StackNavigator);
const BottomTab = createAppContainer(TabNavigator);

export default BottomTab;
