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

        if ((user.roles.includes('agent') || user.roles.includes('agency')) && user.agency.country != 'CO') {
          this.setState({agencyNormal: true});
        }

        if (user.agency){
          this.setState({agencyData: user.agency})
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

    // Agencies User's in Columbia
      if (this.state.agencyCol || cotization){
        return (
          <View>
            <Text style={styles.title}>Descripción de la Orden</Text>
            <Divider style={[styles.dividerStyles, { width: 180 }]} />
            <AgencyCotization title={title} round_trip={round_trip} />
          </View>
        );
      }

      // Agencies User's in around the world
        if (this.state.agencyNormal){
          return (
            <View>
              <Text style={styles.title}>Descripción de la Orden</Text>
              <Divider style={[styles.dividerStyles, { width: 180 }]} />
              <AgencyNormal title={title} price_destination={price_destination} round_trip={round_trip} currency={currency} agency={this.state.agencyData}/>
            </View>
          );
        }

      // Users Clients
        if (!this.state.agencyCol && !item.cotization && !this.state.agencyNormal){
          return (
            <View>
              <Text style={styles.title}>Descripción de la Orden</Text>
              <Divider style={[styles.dividerStyles, { width: 180 }]} />
              <Client title={title} price_destination={price_destination} round_trip={round_trip} currency={currency}/>
            </View>
          );
        }
  }

}

const AgencyCotization = (data) => {
  return (
    <View>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Concepto:  </Text>{data.title['es']}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Precio:  </Text>Por Cotizar</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Cantidad:  </Text>{data.round_trip ? 2 : 1}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Total:  </Text>Por Cotizar</Text>
    </View>
  )
}

const AgencyNormal = (data) => {

  if (!data.agency){
    return (
      <Text>Cargando...</Text>
    )
  } else {

    var price_destination = data.round_trip ? parseFloat(data.price_destination) * 2 : data.price_destination
    var comission = data.agency.comission_percentage
    var lending   = data.agency.lending_percentage
    var price_comission = price_destination * (comission/100)
    var price_lending   = price_destination * (lending/100)
    var price_total_pax = price_destination
    var price_total_agency = price_destination - price_comission - price_lending

    return (
      <View>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Concepto:  </Text>{data.title['es']}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Precio:  </Text>$ {data.price_destination} {data.currency.toUpperCase()}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Cantidad:  </Text>{data.round_trip ? 2 : 1}</Text>
      <Text style={styles.subtitle}> <Text style={styles.strong}>Subtotal:  </Text>$ {price_destination} {data.currency.toUpperCase()}</Text>

      <Text style={styles.subtitle}> <Text style={styles.strong}>Porcentaje Comisión:  </Text>{comission}% = $ {price_comission} {data.currency.toUpperCase()}</Text>

      <Text style={styles.subtitle}> <Text style={styles.strong}>Porcentaje Prestación:  </Text>{lending}% = $ {price_lending} {data.currency.toUpperCase()}</Text>

      <Text style={styles.subtitle}> <Text style={styles.strong}>Precio Total Agencia:  </Text>$ {price_total_agency} {data.currency.toUpperCase()}</Text>

      <Text style={styles.subtitle}> <Text style={styles.strong}>Precio Total PAX:  </Text>$ {price_total_pax} {data.currency.toUpperCase()}</Text>


      </View>
    )

  }
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
