import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Title, Avatar, Card, Paragraph  } from 'react-native-paper';

export default class TransferList extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
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
