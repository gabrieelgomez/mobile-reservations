import React, { Component } from 'react';
import { ActivityIndicator} from 'react-native';
import { Image, StyleSheet, View, Text } from "react-native";
import SplashScreen from 'react-native-splash-screen'


import {  } from 'react-native';

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
import Login from './src/screens/Login';
import CreateAccount from './src/screens/CreateAccount';


class LogoTitle extends React.Component {
  render() {
    return (

      <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./src/images/isotipo-receptivo-colombia.png')}
            resizeMode="contain"
          />
          <Text style={styles.title}>Receptivo Colombia</Text>
      </View>



    );
  }
}


class ListTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.titleList}>Resultados de la búsqueda</Text>
      </View>

    );
  }
}


const StackNavigator = createStackNavigator(
  {
    TransferWidget: {
      screen: TransferWidget,
      key: 'transferWidgetScreen',
      navigationOptions: {
        key: 'transferWidgetScreen',
        headerTitle: <LogoTitle />,
        headerStyle:{backgroundColor:'#9dc107'},
        headerTintColor: '#ffffff',
      }
    },
    Profile: {
      screen: Profile,
      key: 'profileScreen',
      navigationOptions: () => ({
        key: 'profileScreen',
        headerTitle: "Perfil"
      })
    },

    TransferList: {
      screen: TransferList,
      navigationOptions: {
        key: 'transferListScreen',
        headerTitle: <ListTitle />,
        headerStyle:{backgroundColor:'#9dc107'},
        headerTintColor: '#ffffff',
      }
    }

  }
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    TransferWidget: {
      screen: StackNavigator,
      key: 'transferWidgetScreen',
      navigationOptions: () => ({
        key: 'transferWidgetScreen',
        title: 'Traslados',
        tabBarIcon: ({focused, tintColor}) => (
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
      key: 'profileScreen',
      navigationOptions: () => ({
        key: 'profileScreen',
        title: 'Perfil',
        headerTitle: "something",
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
              name='user'
              color={tintColor}
              size={20}
          />
        )
      })
    },

    Login: {
      screen: Login,
      key: 'LoginScreen',
      navigationOptions: () => ({
        key: 'LoginScreen',
        title: 'Login',
        headerTitle: "something",
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
              name='user'
              color={tintColor}
              size={20}
          />
        )
      })
    },

    CreateAccount: {
      screen: CreateAccount,
      key: 'CreateAccountScreen',
      navigationOptions: () => ({
        key: 'CreateAccountScreen',
        title: 'CreateAccount',
        headerTitle: "something",
        tabBarIcon: ({focused, tintColor}) => (
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
    initialRouteName: 'TransferWidget',
    barStyle: { backgroundColor: '#fff' },
    // shifting: true,
    activeTintColor: '#43b7e8',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
    }
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
   //backgroundColor: 'red',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    paddingLeft: 20,
  },
  title: {
    paddingLeft: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: -5,
  },
  titleList: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: -5,
  },
});