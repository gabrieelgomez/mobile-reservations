import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
// import { DatePicker } from './native-base';
import { DatePicker } from '../../../utils/DatePicker';

export default class InputsDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      // gone_date: false,
      round_trip: true,
      dateOrigin: new Date(),
      dateArrival: new Date()
    };
    this.setDateOrigin = this.setDateOrigin.bind(this);
    this.setDateArrival = this.setDateArrival.bind(this);
    this.updateIndex = this.updateIndex.bind(this)
    //this.setDate = this.setDate.bind(this);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  /*setDate(dateOrigin) {
    this.setState({ dateOrigin: dateOrigin });
  }*/

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
          <View style={{flex:1}}>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={true}
              animationType={'fade'}
              androidMode={'calendar'}
              onDateChange={this.setDateOrigin}
              disabled={false}
              hidden={true}
              // placeHolderText='Seleccionar Fecha'
              textStyle={styles.titleSelectDates}
              placeHolderTextStyle={styles.titleSelectDates}
              titleInput='Fecha Ida'
            />
          </View>

          <View style={{flex:1}}>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={true}
              animationType={'fade'}
              androidMode={'calendar'}
              onDateChange={this.setDateOrigin}
              disabled={false}
              hidden={true}
              // placeHolderText='Seleccionar Fecha'
              textStyle={styles.titleSelectDates}
              placeHolderTextStyle={styles.titleSelectDates}
              titleInput='Fecha Vuelta'
            />
          </View>
        </View>
      </View>
    );
  }

  setDateOrigin(day) {
    // console.warn('fecha ida', day);
    this.props.updateFormState('flight_origin_picker', day);
    this.setState({
      dateOrigin: day
    });
  }

  setDateArrival(day) {
    // console.warn('fecha vuelta', day);
    this.props.updateFormState('flight_arrival_picker', day);
    this.setState({
      dateArrival: day
    });
  }
}

const styles = StyleSheet.create({
  fontFamily:{
    fontFamily: 'Poppins-Light',
  },
  fontPicker:{
    fontFamily: 'Poppins-Light',
    color: '#F7F7F7'
  },
  buttonsGroup: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 15
  },
  containerButtonsGroup: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  textButtonGroup: {
    fontFamily: 'Poppins-Regular',
  },
  selectedButtonGroup: {
    backgroundColor: '#9dc107',
  },
  boxInputsDatePicker: {
    paddingTop: 0,
    paddingBottom: 5,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf: 'stretch',
  },
  boxSelectDates:{
    // marginTop: 10,
    // marginBottom: -20,
    // paddingHorizontal: 17,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  titleSelectDates:{
    fontFamily: 'Poppins-Light',
    fontSize: 14,
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
