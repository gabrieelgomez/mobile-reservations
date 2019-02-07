import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import InputsGoogleMaps from '../components/widget/transfers/InputsGoogleMaps';
import RadioButtonFlights from '../components/widget/transfers/RadioButtonFlights';
import InputsAdultsKids from '../components/widget/transfers/InputsAdultsKids';
import InputsDatePicker from '../components/widget/transfers/InputsDatePicker';

import { Button, Divider } from 'react-native-paper';

export default class TransferWidget extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  handlePress = () => {
    this.props.navigation.navigate('TransferList');
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
