import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, ToastAndroid, AsyncStorage, ActivityIndicator } from 'react-native';
import { Button, Divider } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import PriceDestination from './PriceDestination'

export default class Checkout extends Component {

  constructor(props){
    super(props);
    navigate = this.props.navigation.state.params
    this.state = {
      isLoading:             true,
      refreshing:            false,
      showProgress:          false,
      reservation_id:        '...',
      token:                 '...',
      dataVehicle:           navigate.dataVehicle,
      dataWidgetReservation: navigate.dataWidgetReservation,
      dataReservation:       navigate.dataReservation
    }
  }

  componentDidMount(){
    this.setState({
      isLoading: false,
    });
    this.getData('userData')
    this.requestReservationApi()
  }

  requestReservationApi(){
    return fetch(`http://192.168.88.48:3000/api/get_reservation`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == undefined){
          console.log('JSON undefined')
        } else {
          data = responseJson.data;
          this.setState({ reservation_id: data.reservation_id, token: data.invoice })
        }
      })
      .catch((error) => {
        if(error == 'TypeError: Network request failed'){
          console.log('Internet Error.')
        }
      });
  }

  getData(key){
    AsyncStorage.getItem(key).then((value) => {
      if (key == 'userData' && value != null){
        this.setState({userData: JSON.parse(value)});
      }
    })
  }

  async onSendReservation() {
    this.setState({showProgress: true})

    dataReservation = this.state.dataReservation;
    dataWidgetReservation = this.state.dataWidgetReservation;
    dataVehicle = this.state.dataVehicle.attributes;

    if (dataReservation.user_name){
      var {
        user_dni,
        user_name,
        user_phone,
        user_email
      } = dataReservation;
    } else {
      var user_dni   = dataReservation.userData.dni;
      var user_name  = dataReservation.userData.name;
      var user_phone = dataReservation.userData.phone;
      var user_email = dataReservation.userData.email;
    }

    var {
      quantity_seat,
      hour_origin_picker,
      hour_arrival_picker,
      user_address
    } = dataReservation

    var {
      origin_locality,
      arrival_locality,
      departament,
      origin_departament,
      arrival_departament,
      origin_location,
      origin_name,
      arrival_location,
      arrival_name,
      flight_origin_picker,
      flight_arrival_picker,
      round_trip,
      quantity_adults,
      quantity_kids,
    } = dataWidgetReservation

    var {
      price_destination,
      cover,
      currency,
      title
    } = dataVehicle

    return fetch('http://192.168.88.48:3000/api/transfers/create_reservation', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reservation: {
                origin: origin_name,
                arrival: arrival_name,
                origin_location: origin_locality,
                arrival_location: arrival_locality,
                airline_origin: '',
                airline_arrival: '',
                flight_number_origin: '',
                flight_number_arrival: '',
                flight_origin: flight_origin_picker,
                flight_arrival: flight_arrival_picker,
                hour_origin: hour_origin_picker,
                hour_arrival: hour_arrival_picker,
                quantity_adults: quantity_adults,
                quantity_kids: quantity_kids,
                description: user_address,
                quantity_kit: quantity_seat,
                round_trip: round_trip ? 'true' : 'false',
                reservation_mobile: true
              },
              user: {
                name: user_name,
                email: user_email,
                dni: user_dni,
                phone: user_phone
              },
              reservationable: {
                vehicle_id: this.state.dataVehicle.id,
                currency: currency,
                price_destination: price_destination,
                title: title,
                token: this.state.token
              }
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
              this.setState({showProgress: false})
              this.props.navigation.navigate('TransferSuccesReservation', {
                data: responseJson
              })
            }
          })
        .catch((error) =>{
          if(error == 'TypeError: Network request failed'){
            ToastAndroid.show('No hay conexión a internet. Intente más tarde.', ToastAndroid.SHORT);
          }
          this.setState({showProgress: false})
        });
      this.setState({showProgress: false})
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.requestReservationApi()
    this.setState({refreshing: false})
  }

  render() {
    let { errors = {}, ...data } = this.state;
    dataReservation = this.state.dataReservation;
    dataWidgetReservation = this.state.dataWidgetReservation;
    dataVehicle = this.state.dataVehicle.attributes;

    if (dataReservation.user_name){
      var {
        user_dni,
        user_name,
        user_phone,
        user_email
      } = dataReservation;
    } else {
      var user_dni   = dataReservation.userData.dni;
      var user_name  = dataReservation.userData.name;
      var user_phone = dataReservation.userData.phone;
      var user_email = dataReservation.userData.email;
    }

    var {
      quantity_seat,
      hour_origin_picker,
      hour_arrival_picker,
      user_address
    } = dataReservation

    var {
      origin_locality,
      arrival_locality,
      departament,
      origin_departament,
      arrival_departament,
      origin_location,
      origin_name,
      arrival_location,
      arrival_name,
      flight_origin_picker,
      flight_arrival_picker,
      round_trip,
      quantity_adults,
      quantity_kids,
    } = dataWidgetReservation

    var {
      price_destination,
      cover,
      currency,
      title
    } = dataVehicle

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.showProgress && (
          <View style={[styles.container_indicator, styles.horizontal_indicator]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {this.state.showProgress == false && (
          <View style={styles.container}>
            <View style={styles.boxTitles}>
              <Text style={styles.title}>Checkout de Traslado</Text>
              <Text style={styles.subtitle}>Recuerda confirmar tus datos de la reservación antes de continuar.</Text>
            </View>

            <View style={styles.boxTitles}>
              <Text style={styles.title}>Información Personal</Text>
              <Divider style={[styles.dividerStyles, { width: 180 }]} />
              {
                this.state.dataReservation && (
                  <View>
                    <Text style={styles.subtitle}>{user_name}</Text>
                    <Text style={styles.subtitle}>{user_dni}</Text>
                    <Text style={styles.subtitle}>{user_phone}</Text>
                    <Text style={styles.subtitle}>{user_email}</Text>
                    <Text style={styles.subtitle}>{user_address}</Text>
                  </View>
                )
              }
            </View>

            <View style={styles.boxTitles}>
              <Text style={styles.title}>Detalles de la Orden</Text>
              <Divider style={[styles.dividerStyles, { width: 180 }]} />
              {
                this.state.dataReservation && (
                  <View>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>N° Orden:  </Text>{this.state.reservation_id}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>N° Factura:  </Text>{this.state.token}</Text>
                  </View>
                )
              }
            </View>

            <View style={styles.boxTitles}>
              <Text style={styles.title}>Detalles del Traslado</Text>
              <Divider style={[styles.dividerStyles, { width: 180 }]} />
              {
                this.state.dataReservation && (
                  <View>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Origen:  </Text>{origin_name}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Destino:  </Text>{arrival_name}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Tipo de Traslado:  </Text>{round_trip ? 'Ida/Vuelta' : 'Sólo Ida'}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Adultos/Niños:  </Text>{quantity_adults}/{quantity_kids}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Fecha de Origen:  </Text>{flight_origin_picker}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Fecha de Destino:  </Text>{flight_arrival_picker}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Hora de Origen:  </Text>{hour_origin_picker}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Hora de Destino:  </Text>{hour_arrival_picker}</Text>
                    <Text style={styles.subtitle}> <Text style={styles.strong}>Equipaje:  </Text>{quantity_seat} piezas</Text>
                  </View>
                )
              }
            </View>

            <View style={styles.boxTitles}>
              {
                <PriceDestination
                  dataVehicle={dataVehicle}
                  dataWidgetReservation={dataWidgetReservation}
                  dataReservation={this.state.dataReservation}
                />
              }
            </View>

            <View style={[styles.boxBottonSend]}>
              <Button
                title='CONFIRMAR RESERVACIÓN'
                type='outline'
                raised={true}
                buttonStyle={styles.buttonSend}
                titleStyle={styles.buttonTitleStyle}
                onPress={(event) => {
                    this.onSendReservation()
                  }
                }
              />
            </View>
          </View>
        )}


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
  travellerTitle:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginBottom: -10
  },
  strong:{
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  dividerStyles: {
    height: 3,
    backgroundColor: '#e1e8ee',
    marginBottom: 15
  },
  dividerBilling: {
    height: 3,
    backgroundColor: '#e1e8ee',
  },
  imageStyle: {
    height: 200,
    borderBottomColor: '#d6d7da',
    borderBottomWidth: 1
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
  iconContainer:{
    paddingRight: 20
  },

  boxInputFlexTwo: {
    paddingTop: 0,
    paddingBottom: 25,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
  },
  containerInput:{
    flex: 1,
  },
  inputLeft:{
    paddingRight: 20
  },
  inputRight:{
    paddingLeft: 20
  },
  fontFamily:{
    fontFamily: 'Poppins-Light',
  },

});
