import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { Button, Divider, Title, Avatar, Card, Paragraph  } from 'react-native-paper';
import OfflineNotice from '../offline/OfflineNotice'

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

    return fetch(`https://receptivocolombia.com/es/usd/vehicles.json?${query}`)
      .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == undefined){
            this.setState({
              searching: 'Oops..! Algún dato está mal escrito, vaya hacia atrás.',
              refreshing: false
            })
          } else {
            this.setState({ refreshing: false, searching: 'Se encontraron los siguientes vehículos', dataSource: responseJson.data })
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
        <OfflineNotice ref = 'offlineNotice' />
        <Title>{this.state.searching}</Title>
        {
          this.state.dataSource.map((item, i) => (
            <View key = {i}>

              <Divider />
              <Divider />
                <Card>
                  <Card.Cover source = {{ uri: `https://receptivocolombia.com${item.attributes.cover.url}` }} />
                  <Card.Content>
                    <Title>
                      {item.attributes.title['es']}
                    </Title>
                    <Paragraph>
                      {`Máx de Asientos: ${item.attributes.seat} Personas \n Máx de Maletas: ${item.attributes.kit['quantity']} Piezas (${item.attributes.kit['weight']}kg) \n Precio $ ${item.attributes.price_destination}`}
                    </Paragraph>
                  </Card.Content>

                  <Card.Actions>
                    <Button mode = 'outline' onPress = {this.handlePress}>
                      Seleccionar
                    </Button>
                  </Card.Actions>
                </Card>
              <Divider />
              <Divider />

            </View>
          ))
        }
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});