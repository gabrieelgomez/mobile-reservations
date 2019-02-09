import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import { TextInput } from 'react-native-paper';

export default class InputsAdultsKids extends Component {

  render() {

    return (
      <View>
        <TextInput
          mode         = 'outlined'
          label        = 'Adultos'
          value        = {this.props.dataForm.quantity_adults}
          onChangeText = {text => this.props.updateFormState('quantity_adults', text)}
        />
        <TextInput
          mode         = 'outlined'
          label        = 'Niños'
          value        = {this.props.dataForm.quantity_kids}
          onChangeText = {text => this.props.updateFormState('quantity_kids', text)}
        />
      </View>
    );
  }
}
