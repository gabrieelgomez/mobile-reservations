import React, { Component } from 'react';
import { ActivityIndicator} from 'react-native';
import { Image, StyleSheet, View, Text, AsyncStorage } from "react-native";
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, BottomTabBar, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// Transfers Components
import TransferWidget from './src/screens/TransferWidget';
import TransferList from './src/components/transfers/listing/Listing';
import TransferReservation from './src/components/transfers/reservations/Reservation';
import TransferCheckout from './src/components/transfers/checkout/Checkout';
import TransferSuccesReservation from './src/components/transfers/reservations/SuccessReservation'

// Others Widgets Components
import TourWidget from './src/screens/TourWidget';
import CircuitWidget from './src/screens/CircuitWidget';
import MultidestinationWidget from './src/screens/MultidestinationWidget';
// Profile - User Components
import Login from './src/screens/Login';
import Profile from './src/components/profile/Profile';

class LogoTitle extends React.Component {
  render() {
    return (

      <View style={styles.container_logo}>
          <Image
            style={styles.logo}
            source={require('./src/images/isotipo-yellow.png')}
            resizeMode="contain"
          />
          <Text style={styles.title}>Receptivo Colombia</Text>
      </View>
    );
  }
}

const StackTransferNavigator = createStackNavigator(
  {
    TransferWidget: {
      screen: TransferWidget,
      key: 'transferWidgetScreen',
      navigationOptions: {
        key: 'transferWidgetScreen',
        headerTitle: <LogoTitle />,
      }
    },

    TransferList: {
      screen: TransferList,
      navigationOptions: {
        key: 'transferListScreen',
        headerStyle:{backgroundColor:'#fff'},
      }
    },

    TransferReservation: {
      screen: TransferReservation,
      navigationOptions: {
        key: 'TransferReservationScreen',
        headerStyle:{backgroundColor:'#fff'},
      }
    },

    TransferCheckout: {
      screen: TransferCheckout,
      navigationOptions: {
        key: 'TransferCheckoutScreen',
        headerStyle:{backgroundColor:'#fff'},
      }
    },

    TransferSuccesReservation: {
      screen: TransferSuccesReservation,
      navigationOptions: {
        key: 'TransferSuccesReservationtScreen',
        headerStyle:{backgroundColor:'#fff'},
      }
    },

  }
);

const StackLoginNavigator    = createStackNavigator(
  {
    Login: {
      screen: Login,
      key: 'LoginScreen',
      navigationOptions: {
        key: 'LoginScreen',
        headerTitle: <LogoTitle />,
      }
    }

  }
);

const TabNavigator           = createMaterialBottomTabNavigator(
  {
    TransferWidget: {
      screen: StackTransferNavigator,
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
    TourWidget: {
      screen: TourWidget,
      key: 'TourWidgetScreen',
      navigationOptions: () => ({
        key: 'TourWidgetScreen',
        title: 'Tours',
        headerTitle: "something",
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
              name='map-o'
              color={tintColor}
              size={20}
          />
        )
      })
    },
    CircuitWidget: {
      screen: CircuitWidget,
      key: 'CircuitWidgetScreen',
      navigationOptions: () => ({
        key: 'CircuitWidgetScreen',
        title: 'Circuitos',
        headerTitle: "something",
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
              name='train'
              color={tintColor}
              size={20}
          />
        )
      })
    },
    MultidestinationWidget: {
      screen: MultidestinationWidget,
      key: 'MultidestinationWidgetScreen',
      navigationOptions: () => ({
        key: 'MultidestinationWidgetScreen',
        title: 'Multidestinos',
        headerTitle: "something",
        tabBarIcon: ({focused, tintColor}) => (
          <Icon
              name='plane'
              color={tintColor}
              size={20}
          />
        )
      })
    },
    Profile: {
      screen: Profile,
      key: 'ProfileScreen',
      navigationOptions: () => ({
        key: 'ProfileScreen',
        title: 'Profile',
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
  },
  {
    initialRouteName: 'TransferWidget',
    barStyle: { backgroundColor: '#fff' },
    activeTintColor: '#43b7e8',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
    }
  }
);


const StackLogin    = createAppContainer(StackLoginNavigator);
const StackTransfer = createAppContainer(StackTransferNavigator);
const BottomTab     = createAppContainer(TabNavigator);

const SwichtNavigat = createSwitchNavigator(
  {
    Auth: StackLogin,
    App: BottomTab,
  },
  {
    initialRouteName: 'Auth',
  }
)

const Switch = createAppContainer(SwichtNavigat);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getData('uid')
    this.state = { isLoaded: false };
  }

  getData(key){
		AsyncStorage.getItem(key).then((value) => {
			if (key == 'uid' && value != null){
				this.setState({showProgress: false, currentUser: true, userEmail: value});
			}
      this.setState({showProgress: false})
		})
	}

  componentDidMount() {
    this.setState({
      isLoaded: true
    });
    SplashScreen.hide();
  }

  renderLoading = () => <ActivityIndicator />;

  // renderApp = () => <Switch />;
  // renderApp = () => <StackLogin />;
  // renderApp = () => this.state.currentUser ? <BottomTab /> : <Login />;
  renderApp = () => this.state.currentUser ? <BottomTab /> : <Switch />;

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
   // backgroundColor: 'red',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  container_logo:{
    flex: 1,
    flexDirection: "row",
   //backgroundColor: 'red',
    paddingHorizontal: 22,
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
