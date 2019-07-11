import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { Divider, Title, Avatar, Paragraph  } from 'react-native-paper';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class SuccessReservation extends Component {

  constructor(props){
    super(props);
    navigate = this.props.navigation.state.params
    this.state = {
      dataReservation: navigate.data.data
    }
  }

  render() {
    data = this.state.dataReservation
    return (
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.cardSuccess}>
            <Image
              style={styles.sizeSuccess}
              source={require('../../../images/success.gif')}
            />
          </View>

          <View style={styles.boxTitles}>
            <Text style={[styles.title, styles.textCenter]}>Reservación Exitosa</Text>
            <Text style={[styles.subtitle, styles.textCenter]}>Confirmaremos los datos de su solicitud, y espere que respondamos su reserva.</Text>
          </View>

          <View style={[styles.boxTitles, {marginTop: 30}]}>
            <Text style={styles.title}>Descripción de la Reservación</Text>
            <Divider style={[styles.dividerStyles, { width: 180 }]} />

            {
              this.state.dataReservation && (
                <View>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>N° de Orden:  </Text>{data.id}</Text>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>N° de Factura:  </Text>{data.invoice.token}</Text>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>Origen:  </Text>{data.origin}</Text>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>Destino:  </Text>{data.arrival}</Text>
                  <PriceDestination data={data}/>
                </View>
              )
            }
          </View>

          <View style={[styles.boxBottonSend]}>
            <Button
              title='ACEPTAR'
              type='outline'
              raised={true}
              buttonStyle={styles.buttonSend}
              titleStyle={styles.buttonTitleStyle}
              onPress={(event) => {
                  this.props.navigation.navigate('TransferWidget')
                }
              }
            />
          </View>

        </View>
      </ScrollView>
    );
  }

}

const PriceDestination = (data) => {
  data = data.data
  if (data.order.price_total_pax == 0){
    price_total_pax = 'Por Cotizar'
  } else {
    price_total_pax = `${data.invoice.currency.toUpperCase()} $${data.order.price_total_pax}`
  }
  return (
    <Text style={styles.subtitle}> <Text style={styles.strong}>Total:  </Text>{price_total_pax}</Text>
  )
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
    // paddingTop: 10,
  },
  textCenter: {
    textAlign: 'center'
  },
  title:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  subtitle:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    // marginBottom: 10,
  },
  cardSuccess: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 150
	},
  strong:{
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  sizeSuccess: {
    width: 100,
    height:100
  },
  boxBottonSend: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: 20,
    marginBottom: 30
  },
  buttonSend: {
    backgroundColor: "#9dc107",
    borderColor: "#9dc107",
    borderRadius: 5,
    padding: 10,
    width: 360
  },
  buttonTitleStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    // marginLeft: 20,
  },
  dividerStyles: {
    height: 3,
    backgroundColor: '#e1e8ee',
    marginBottom: 15
  },
});
