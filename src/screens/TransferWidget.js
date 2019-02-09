import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import InputsGoogleMaps from '../components/widget/transfers/InputsGoogleMaps';
import RadioButtonFlights from '../components/widget/transfers/RadioButtonFlights';
import InputsAdultsKids from '../components/widget/transfers/InputsAdultsKids';
import InputsDatePicker from '../components/widget/transfers/InputsDatePicker';
import { Button, Divider, ActivityIndicator, Colors } from 'react-native-paper';

export default class TransferWidget extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      locality:              [],
      origin_locality:       '',
      arrival_locality:      '',
      departament:           [],
      origin_departament:    '',
      arrival_departament:   '',
      origin_location:       [],
      origin_name:           '',
      arrival_location:      [],
      arrival_name:          '',
      flight_origin_picker:  '',
      flight_arrival_picker: '',
      round_trip:            'true',
      quantity_adults:       '2',
      quantity_kids:         '',
    }
  }

  updateState(key, value) {
    this.setState({ [key]: value });
    // console.warn(this.state);
  }

  componentDidMount(){
    this.setState({
      isLoading: false
    });
  }

  handlePress = () => {
    // this.setState({
    //   isLoading: true
    // });
    this.props.navigation.navigate('TransferList');
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <RadioButtonFlights
            dataForm        = {this.state}
            updateFormState = {this.updateState.bind(this)}
          />

          <InputsGoogleMaps
            dataForm        = {this.state}
            updateFormState = {this.updateState.bind(this)}
          />

          <InputsAdultsKids
            dataForm        = {this.state}
            updateFormState = {this.updateState.bind(this)}
          />

          <InputsDatePicker
            dataForm        = {this.state}
            updateFormState = {this.updateState.bind(this)}
          />

          <Divider />
          <Divider />
          <Divider />
          <Divider />

          <Text>`Fecha Ida - {this.state.flight_origin_picker}`</Text>
          <Text>`Fecha Vuelta - {this.state.flight_arrival_picker}`</Text>

          <Button icon="search" mode="contained" onPress={this.handlePress}>
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
