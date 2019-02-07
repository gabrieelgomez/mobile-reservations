import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import {Calendar} from 'react-native-calendars';
import { Button, Divider } from 'react-native-paper';

export default class InputsDatePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {gone_date: false, return_date: true };
    this.setDateIda    = this.setDateIda.bind(this);
    this.setDateVuelta = this.setDateVuelta.bind(this);
  }

  render() {
    return (
      <View>
        <Button
          mode = 'contained'
          icon = 'fingerprint'
          onPress = {() => this.setState({gone_date: true})}
        >
          Fecha Ida
        </Button>
        <Divider />
        <Divider />
        <Divider />
        <Divider />

        <ConfirmDialog
            visible        = {this.state.gone_date}
            title          = "Fecha Ida"
            onTouchOutside = {() => this.setState({gone_date: false})}
            positiveButton = {{
                title: "OK",
                onPress: () => this.setState({gone_date: false})
            }}>
            <Text style = {styles.text}>Calendar with selectable date and arrows</Text>
            <Calendar
              onDayPress  = {this.setDateIda}
              style       = {styles.calendar}
              markedDates = {{[this.state.fecha_ida]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
              hideExtraDays
            />
        </ConfirmDialog>

        {
          this.state.return_date &&
          <Button
            mode = 'contained'
            icon = 'fingerprint'
            onPress = {() => this.setState({return_date_button: true})}
            >
              Fecha Vuelta
            </Button>
        }

        {
          this.state.return_date &&

          <ConfirmDialog
              visible        = {this.state.return_date_button}
              title          = "Fecha Vuelta"
              onTouchOutside = {() => this.setState({return_date_button: false})}
              positiveButton = {{
                  title: "OK",
                  onPress: () => this.setState({return_date_button: false})
              }}>
              <Text style = {styles.text}>Calendar with selectable date and arrows</Text>
              <Calendar
                onDayPress  = {this.setDateVuelta}
                style       = {styles.calendar}
                markedDates = {{[this.state.fecha_vuelta]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
                hideExtraDays
              />
          </ConfirmDialog>
        }
      </View>
    );
  }

  setDateIda(day) {
    console.warn('fecha ida', day);
    this.setState({
      fecha_ida: day.dateString
    });
  }

  setDateVuelta(day) {
    console.warn('fecha vuelta', day);
    this.setState({
      fecha_vuelta: day.dateString
    });
  }

}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
});
