import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { DatePicker } from '../../../utils/DatePicker';

export default class InputsDatePicker extends Component {
  constructor(props) {
    super(props);
    today    = new Date();
    nextDay  = new Date().setDate(today.getDate()+1);
    this.state = {
      selectedIndex: 0,
      roundTrip: true,
      dateOrigin: new Date(),
      dateArrival: new Date(),
      minimumArrival: new Date(nextDay)
    };
    this.setDateOrigin = this.setDateOrigin.bind(this);
    this.setDateArrival = this.setDateArrival.bind(this);
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    roundTrip = selectedIndex == 0 ? true : false
    this.setState({selectedIndex: selectedIndex, roundTrip: roundTrip})
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
          <View style={{flex:1}}>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date()}
              maximumDate={this.state.maximumOrigin}
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

          {
            this.state.roundTrip && (
              <View style={{flex:1}}>
                <DatePicker
                  defaultDate={this.state.minimumArrival}
                  minimumDate={this.state.minimumArrival}
                  changedMinimumDate={this.state.minimumArrival}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={true}
                  animationType={'fade'}
                  androidMode={'calendar'}
                  onDateChange={this.setDateArrival}
                  disabled={false}
                  hidden={true}
                  // placeHolderText='Seleccionar Fecha'
                  textStyle={styles.titleSelectDates}
                  placeHolderTextStyle={styles.titleSelectDates}
                  titleInput='Fecha Vuelta'
                />
              </View>
            )
          }

        </View>
      </View>
    );
  }

  setDateOrigin(day) {
    // console.warn('fecha ida', day);
    nextDay  = new Date().setDate(day.getDate()+1)
    dayString = day.toLocaleDateString('en-GB')
    this.props.updateFormState('flight_origin_picker', dayString);
    debugger

    if (dayString == this.state.dateArrival.toLocaleDateString('en-GB')){
      this.props.updateFormState('flight_arrival_picker', dayString);
    }


    this.setState({
      minimumArrival: new Date(nextDay),
      dateOrigin: day
    });
  }

  setDateArrival(day) {
    // console.warn('fecha vuelta', day);
    this.props.updateFormState('flight_arrival_picker', day.toLocaleDateString('en-GB'));
    this.setState({
      maximumOrigin: new Date(day),
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
