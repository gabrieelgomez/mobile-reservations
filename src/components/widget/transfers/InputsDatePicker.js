import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
// import { Dialog, ConfirmDialog } from "react-native-simple-dialogs";
// import { Calendar } from "react-native-calendars";
// import { Button, Divider } from "react-native-paper";
import { ButtonGroup } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';


export default class InputsDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      gone_date: false,
      return_date: true,
      date_origin: 'Fecha Ida',
      date_arrival: 'Fecha Vuelta'
    };
    this.setDateIda = this.setDateIda.bind(this);
    this.setDateVuelta = this.setDateVuelta.bind(this);
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['IDA/VUELTA', 'SÓLO IDA'];
    const { selectedIndex } = this.state;

    return (
      <View>
        <View style={[styles.buttonsGroup]}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.containerButtonsGroup}
            textStyle={styles.textButtonGroup}
            selectedButtonStyle={styles.selectedButtonGroup}
          />
        </View>

        <View style={[styles.boxInputsDatePicker]}>
          <TextField
            labelTextStyle={styles.fontFamily}
            containerStyle={[styles.containerInputDatePicker, styles.inputRoundTrip]}
            tintColor='#9dc107'
            label='Fecha Ida'
          />
          <TextField
            labelTextStyle={styles.fontFamily}
            containerStyle={[styles.containerInputDatePicker, styles.inputOneWay]}
            tintColor='#9dc107'
            label='Fecha Vuelta'
          />
        </View>
      </View>
    );
  }

  setDateIda(day) {
    // console.warn('fecha ida', day);
    this.props.updateFormState("flight_origin_picker", day.dateString);
    this.setState({
      date_origin: day.dateString
    });
  }

  setDateVuelta(day) {
    // console.warn('fecha vuelta', day);
    this.props.updateFormState("flight_arrival_picker", day.dateString);
    this.setState({
      date_arrival: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  fontFamily:{
    fontFamily: 'Poppins-Light',
  },
  buttonsGroup: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 15
  },
  containerButtonsGroup: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  textButtonGroup: {
    fontFamily: 'Poppins-Regular',
  },
  selectedButtonGroup: {
    backgroundColor: "#9dc107",
  },
  boxInputsDatePicker: {
    paddingTop: 0,
    paddingBottom: 5,
    paddingHorizontal: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
  },
  containerInputDatePicker:{
    flex: 1,
  },
  inputRoundTrip:{
    paddingRight: 20
  },
  inputOneWay:{
    paddingLeft: 20
  },
});
