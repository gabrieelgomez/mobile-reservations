import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { Button, Divider } from 'react-native-elements'

export default class Reservation extends Component {

  constructor(props){
    super(props);
    navigate = props = this.props.navigation.state.params
    this.state ={ isLoading: true, refreshing: false, vehicleTitle: 'Vehículo...', dataVehicle: navigate.dataVehicle, dataReservation: navigate.dataReservation}
  }

  componentDidMount(){
    this.setState({
      isLoading: false,
    });
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
            <Text style={styles.title}>Reservación de Traslado</Text>
            <Text style={styles.subtitle}>{this.state.dataVehicle.attributes.title['es']}</Text>
          </View>


          <View style={styles.boxTitles}>
            <Text style={styles.title}>Datos de Reserva</Text>
            <Divider style={[styles.dividerStyles, { width: 180 }]} />
            {
              this.state.dataReservation && (
                <View>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>Desde:  </Text>{this.state.dataReservation.origin_locality}</Text>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>Hasta:  </Text>{this.state.dataReservation.arrival_locality}</Text>
                </View>
              )
            }
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
  strong:{
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  dividerStyles: {
    height: 3,
    backgroundColor: '#e1e8ee',
    marginBottom: 15
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
