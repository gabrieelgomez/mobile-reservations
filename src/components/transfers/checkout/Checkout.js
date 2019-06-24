import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, ToastAndroid } from 'react-native';
import { Button, Divider } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Checkout extends Component {

  constructor(props){
    super(props);
    navigate = this.props.navigation.state.params
    console.log(navigate)
    this.state = {
      isLoading:       true,
      refreshing:      false,
    }
  }

  componentDidMount(){
    this.setState({
      isLoading: false,
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.setState({refreshing: false})
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.boxTitles}>
            <Text style={styles.title}>Checkout de Traslado</Text>
            <Text style={styles.subtitle}>{JSON.stringify(this.props.navigation.state.params.dataReservation)}</Text>
          </View>
        </View>

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  boxTitles: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  title:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black'
  },
  subtitle:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginBottom: 10
  },
});
