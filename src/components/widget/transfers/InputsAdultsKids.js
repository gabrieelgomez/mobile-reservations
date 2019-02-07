import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import { TextInput } from 'react-native-paper';

export default class InputsAdultsKids extends Component {

  state = {
    adults: '',
    kids: ''
  };

  render() {

    return (
      <View>
        <TextInput
          mode         = 'outlined'
          label        = 'Adultos'
          value        = {this.state.adults}
          onChangeText = {text => this.setState({ adults: text })}
        />
        <TextInput
          mode         = 'outlined'
          label        = 'Niños'
          value        = {this.state.kids}
          onChangeText = {text => this.setState({ kids: text })}
        />
      </View>
    );
  }
}
