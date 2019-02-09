import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import InputsGoogleMaps from '../components/widget/transfers/InputsGoogleMaps';
import RadioButtonFlights from '../components/widget/transfers/RadioButtonFlights';
import InputsAdultsKids from '../components/widget/transfers/InputsAdultsKids';
import InputsDatePicker from '../components/widget/transfers/InputsDatePicker';
import { Button, Divider, ActivityIndicator, Colors } from 'react-native-paper';

export default class TransferWidget extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: false}
  }

  componentDidMount(){
    this.setState({
      isLoading: false
    });
  }

  handlePress = () => {

    this.setState({
      isLoading: true
    });

    return fetch(`https://bigwave-api.herokuapp.com/v1/users`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function(){
          if (responseJson){
            this.props.navigation.navigate('TransferList', responseJson);
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

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <RadioButtonFlights />
          <InputsGoogleMaps />
          <InputsAdultsKids />
          <InputsDatePicker />
          <Divider />
          <Divider />
          <Divider />
          <Divider />

          <Button icon="add-a-photo" mode="contained" onPress={this.handlePress}>
            Buscar
          </Button>

          <ActivityIndicator animating={this.state.isLoading} color={Colors.red800} />

        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
