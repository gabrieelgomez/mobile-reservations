import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { Divider, Title, Avatar, Paragraph  } from 'react-native-paper';
import OfflineNotice from '../offline/OfflineNotice'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Listing extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, dataSource: [], refreshing: false, searching: 'Buscando resultados...'}
  }

  componentDidMount(){
    this.setState({
      isLoading: false
    });
    this.requestVehicleApi(this.props.navigation.state.params)
  }

  requestVehicleApi(params) {
    const data = params;
    locality =              data.locality
    origin_locality =       data.origin_locality
    arrival_locality =      data.arrival_locality
    departament =           data.departament
    origin_departament =    data.origin_departament
    arrival_departament =   data.arrival_departament
    origin_location =       data.origin_location
    origin_name =           data.origin_name
    arrival_location =      data.arrival_location
    arrival_name =          data.arrival_name
    flight_origin_picker =  data.flight_origin_picker
    flight_arrival_picker = data.flight_arrival_picker
    round_trip =            data.round_trip
    quantity_adults =       data.quantity_adults
    quantity_kids =         data.quantity_kids

    const query = `round_trip=${round_trip}&origin_name=${origin_name}&origin_location=${origin_location}&origin_locality=${origin_locality}&origin_departament=${origin_departament}&flight_origin_picker=${flight_origin_picker}&arrival_name=${arrival_name}&arrival_location=${arrival_location}&arrival_locality=${arrival_locality}&arrival_departament=${arrival_departament}&flight_arrival_picker=${flight_arrival_picker}&quantity_adults=${quantity_adults}&quantity_kids=${quantity_kids}`
    console.log(query)
    return fetch(`https://receptivocolombia.com/es/usd/vehicles.json?${query}`)
      .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == undefined){
            this.setState({
              searching: 'Oops..! Algún dato está mal escrito, vaya hacia atrás.',
              refreshing: false
            })
          } else {
            this.setState({ refreshing: false, searching: 'Escoge el vehículo que se adapte a tus necesidades.', dataSource: responseJson.data })
          }
        })
          .catch((error) => {
            if(error == 'TypeError: Network request failed'){
              this.setState({
                searching: 'Oops..! Intente de nuevo, deslice hacia abajo. Kindly check if the device is connected to stable cellular data plan or WiFi.',
                refreshing: false
              })
            }
            // console.error(error);
          });

  }

  handlePress = () => {
    this.props.navigation.navigate('TransferWidget');
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.requestVehicleApi(this.props.navigation.state.params);
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
            <Text style={styles.title}>Vehículos Disponibles</Text>
            <Text style={styles.subtitle}>{this.state.searching}</Text>
          </View>

          <OfflineNotice ref = 'offlineNotice' />
          {
            this.state.dataSource.map((item, i) => (
              <View
                style={[styles.containerCards]}
                key = {i}
              >
                <Card
                  containerStyle={styles.containerStyle}
                  imageStyle={styles.imageStyle}
                  image={{ uri: `https://receptivocolombia.com/uploads/keppler_travel/vehicle/cover/2/Hyundai_Receptivo_Colombia.jpg` }}
                >
                  <Text style={[styles.titleCard]}>
                    {item.attributes.title['es']}
                  </Text>

                  <View style={[styles.boxDetails]}>
                    <View>
                      <Text style={[styles.titleDetails]}>Máx. Cantidad de Pasajeros</Text>
                      <Text style={[styles.subtitle]}>{`${item.attributes.seat} Pasajeros`}</Text>
                      <Text style={[styles.titleDetails]}>Máx. Cantidad Maletas</Text>
                      <Text style={[styles.subtitle]}>{`${item.attributes.kit['quantity']} pzas. (${item.attributes.kit['weight']}kg)`}</Text>
                    </View>
                    <View>
                      <Text style={[styles.titlePrice]}>$ 99.000.000 COP</Text>
                    </View>
                  </View>

                  <Button
                    title='RESERVAR'
                    type='outline'
                    raised={false}
                    buttonStyle={styles.buttonReservation}
                    titleStyle={styles.buttonTitleStyle}
                    // onPress={this.handlePress}
                  />
                </Card>
              </View>

            ))
          }
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
  containerCards: {
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: 'auto',
    paddingTop: 0,
    paddingBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerStyle:{
    borderRadius: 5,
    borderColor: '#868686'
  },
  boxDetails:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  titleCard: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: 'black',
    marginBottom: 10
  },
  titleDetails:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#000'
  },
  titlePrice:{
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: 'green',
    marginTop: 32
  },
  imageStyle: {
    height: 200,
    borderBottomColor: '#d6d7da',
    borderBottomWidth: 1
  },
  buttonReservation: {
    backgroundColor: '#9dc107',
    borderColor: '#9dc107',
    borderRadius: 5,
    padding: 10,
    width: 340
  },
  buttonTitleStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 20,
  },
});
