import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class PriceDestination extends Component {

  constructor(props){
    super(props);
    this.state = {
      agency: false
    }
  }

  componentDidMount(){
    this.getData('userData')
  }

  getData(key){
    AsyncStorage.getItem(key).then((value) => {
      if (key == 'userData' && value != null){
        user = JSON.parse(value)
        this.setState({userData: user});
        console.log(user)
        if ((user.roles.includes('agent') || user.roles.includes('agency')) && user.agency.country == 'CO'){
          this.setState({agency: true});
        }
      }
    })
  }

  render() {
    item = this.props.dataVehicle
    return (
      <View>
        {(this.state.agency || item.cotization) && ( <Cotization /> )}
        {(!this.state.agency && !item.cotization) && (<Client item={item}/>)}
      </View>
    );
  }

}

const Cotization = () => {
  return (
    <Text style={[styles.titlePrice]}>Por Cotizar</Text>
  )
}

const Client = (data) => {
  return (
    <Text style={[styles.titlePrice]}>{`$ ${data.item.price_destination} ${data.item.currency.toUpperCase()}`}</Text>
  )
}

const styles = StyleSheet.create({
  titlePrice:{
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: 'green',
    marginTop: 32
  },
});
