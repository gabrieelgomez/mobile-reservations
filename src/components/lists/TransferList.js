import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Title, Avatar, Card, Paragraph  } from 'react-native-paper';

export default class TransferList extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    this.setState({
      isLoading: false
    });

    const data = this.props.navigation.state.params;
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
        this.setState({
          dataSource: responseJson,
        }, function(){
          if (responseJson){
            console.warn('Data', responseJson)
          }
          else{
            console.warn('Falló')
          }
        });
      })
      .catch((error) =>{
        console.error(error);
      });

  }

  handlePress = () => {
    this.props.navigation.navigate('TransferWidget');
  }

  render() {

    const car_img = 'https://receptivocolombia.com/uploads/keppler_travel/vehicle/cover/3/Mercedes_Benz_Receptivo_Colombia.jpg'
    const car_title = 'Traslado Van Ejecutiva 1 a 12 pasajeros'
    const car_description = ' Máx de Asientos: 12 Personas \n Máx de Maletas: 12 Piezas (23kg)'
    return (
      <ScrollView>
        <Title> Sus resultados son: ...</Title>

        <Divider />
        <Divider />

        <Card>
          <Card.Cover source = {{ uri: car_img }} />
          <Card.Content>
            <Title>
              {car_title}
            </Title>
            <Paragraph>
              {car_description}
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

        <Card>
          <Card.Cover source = {{ uri: car_img }} />
          <Card.Content>
            <Title>
              {car_title}
            </Title>
            <Paragraph>
              {car_description}
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


        <Card>
          <Card.Cover source = {{ uri: car_img }} />
          <Card.Content>
            <Title>
              {car_title}
            </Title>
            <Paragraph>
              {car_description}
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

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
