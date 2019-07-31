import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Divider } from 'react-native-elements'

export default class PriceDestination extends Component {

  constructor(props){
    super(props);
    this.state = {
      agencyCol: false,
      agencyNormal: false
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
          this.setState({agencyCol: true});
        }

        if (user.roles.includes('agent') || user.roles.includes('agency')) {
          this.setState({agencyNormal: true});
        }
      }
    })
  }

  render() {
    var {
      round_trip,
      quantity_adults
    } = this.props.dataWidgetReservation

    var {
      price_destination,
      cover,
      currency,
      title,
      cotization
    } = this.props.dataVehicle

    return (
      <View>
        <Text style={styles.title}>Descripción de la Orden</Text>
        <Divider style={[styles.dividerStyles, { width: 180 }]} />
          {(this.state.agencyCol || cotization) && ( <Cotization title={title} round_trip={round_trip} /> )}
          {(!this.state.agencyCol && !item.cotization) && (<Client title={title} price_destination={price_destination} round_trip={round_trip} currency={currency}/>)}
      </View>
    );
  }

}

const Cotization = (data) => {
  return (
    <View>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Concepto:  </Text>{data.title['es']}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Precio:  </Text>Por Cotizar</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Cantidad:  </Text>{data.round_trip ? 2 : 1}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Total:  </Text>Por Cotizar</Text>
    </View>
  )
}

const Client = (data) => {
  return (
    <View>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Concepto:  </Text>{data.title['es']}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Precio:  </Text>$ {data.price_destination} {data.currency.toUpperCase()}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Cantidad:  </Text>{data.round_trip ? 2 : 1}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Total:  </Text>$ {data.round_trip ? parseFloat(data.price_destination) * 2 : data.price_destination} {data.currency.toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  dividerStyles: {
    height: 3,
    backgroundColor: '#e1e8ee',
    marginBottom: 15
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
  strong:{
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
});
