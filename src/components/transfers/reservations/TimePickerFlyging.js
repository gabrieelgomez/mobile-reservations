import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { TimePicker } from '../../../utils/TimePicker';

export default class TimePickerFly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePickerOrigin: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ visiblePickerOrigin: true });
  };

  hidePickerOrigin = () => {
    this.setState({ visiblePickerOrigin: false });
  };

  confirmPickerOrigin = data => {
    var time = data.date.getHours() + ":" + data.date.getMinutes();
    console.log(time);
    this.props.updateFormState(data.field_form, time);
    this.hidePickerOrigin();
  };

  render() {

    return (
      <View style={[styles.boxInputFlexTwo]}>
        <View style={{flex:1}}>
          <TimePicker
            mode='time'
            isVisible={this.state.visiblePickerOrigin}
            onConfirm={this.confirmPickerOrigin}
            onCancel={this.hidePickerOrigin}
            titleInput='Hora Origen'
            fieldForm='hour_origin_picker'
            labelTextStyle={styles.fontFamily}
            containerStyle={[styles.containerInput, styles.inputLeft]}
          />
        </View>

        <View style={{flex:1}}>
          <TimePicker
            mode='time'
            isVisible={this.state.visiblePickerOrigin}
            onConfirm={this.confirmPickerOrigin}
            onCancel={this.hidePickerOrigin}
            titleInput='Hora Destino'
            fieldForm='hour_arrival_picker'
            labelTextStyle={styles.fontFamily}
            containerStyle={[styles.containerInput, styles.inputRight]}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  boxInputFlexTwo: {
    paddingTop: 0,
    paddingBottom: 25,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
  },
  containerInput:{
    flex: 1,
  },
  inputLeft:{
    paddingRight: 20
  },
  inputRight:{
    paddingLeft: 20
  },
});
