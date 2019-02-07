import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import { RadioButton } from 'react-native-paper';

export default class RadioButtonFlights extends Component {

  constructor(props) {
    super(props);
    this.state = {checked: 'ida_vuelta'};
  }

  render() {

    return (
      <View>
        <Text>Ida - Vuelta</Text>
        <RadioButton
          value   = "ida_vuelta"
          status  = {this.state.checked === 'ida_vuelta' ? 'checked' : 'unchecked'}
          onPress = {() => { this.setState({ checked: 'ida_vuelta' }); }}
        />

        <Text>Sólo Ida</Text>
        <RadioButton
          value   = "solo_ida"
          status  = {this.state.checked === 'solo_ida' ? 'checked' : 'unchecked'}
          onPress = {() => { this.setState({ checked: 'solo_ida' }); }}
        />
      </View>
    );
  }
}
