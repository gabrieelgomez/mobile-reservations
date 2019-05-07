import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  Dimensions
} from "react-native";

import InputOriginGoogleMaps from "../components/widget/transfers/InputOriginGoogleMaps";
import InputArrivalGoogleMaps from "../components/widget/transfers/InputArrivalGoogleMaps";
import RadioButtonFlights from "../components/widget/transfers/RadioButtonFlights";
import InputsAdultsKids from "../components/widget/transfers/InputsAdultsKids";
import InputsDatePicker from "../components/widget/transfers/InputsDatePicker";
import { Button, Divider, ActivityIndicator, Colors } from "react-native-paper";
import OfflineNotice from "../components/offline/OfflineNotice";
import { Switch } from "react-native-paper";

import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonGroup } from 'react-native-elements';

export default class TransferWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      locality: [],
      origin_locality: "",
      arrival_locality: "",
      departament: [],
      origin_departament: "",
      arrival_departament: "",
      origin_location: [],
      origin_name: "",
      arrival_location: [],
      arrival_name: "",
      flight_origin_picker: "",
      flight_arrival_picker: "",
      round_trip: true,
      quantity_adults: "2",
      selectedIndex: 0,
      quantity_kids: ""
    };
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  updateState(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  handlePress = () => {
    this.props.navigation.navigate("TransferList", this.state);
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.refs.offlineNotice.connectivityChange();
    this.setState({ refreshing: false });
  };

  render() {
    const { isSwitchOn } = this.state;
    const buttons = ['IDA/VUELTA', 'SÓLO IDA'];
    const { selectedIndex } = this.state;

    return (
      <ScrollView>
        <View
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >

        <View style={styles.boxOne}>
          <Text style={styles.title}>Reservación de Traslado</Text>
          <Text style={styles.subtitle}>¡Reserva el traslado de tu preferencia, y viaja a donde quieras!</Text>
        </View>

        <View style={[styles.boxInputsGoogle]}>
          <View style={[styles.inputsOrigin]}>
            <TextField
              labelTextStyle={styles.fontFamily}
              tintColor='#9dc107'
              label='Origen'
            />

            <TextField
              labelTextStyle={styles.fontFamily}
              tintColor='#9dc107'
              label='Destino'
            />
          </View>
        </View>

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

        <View style={[styles.boxInputsAdultsKids]}>
          <TextField
            labelTextStyle={styles.fontFamily}
            containerStyle={[styles.containerInputDatePicker, styles.inputRoundTrip]}
            tintColor='#9dc107'
            label='Adultos'
          />

          <TextField
            labelTextStyle={styles.fontFamily}
            containerStyle={[styles.containerInputDatePicker, styles.inputOneWay]}
            tintColor='#9dc107'
            label='Niños'
          />
        </View>

        <View style={[styles.boxThree]}>
            <Button
              icon="search"
              mode="contained"
              onPress={this.handlePress}
              style={styles.buttonSend}
            >
              BUSCAR
            </Button>
        </View>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
    //justifyContent: "space-between"
    //backgroundColor: "red"
  },
  box: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttonSend: {
    backgroundColor: "#9dc107",
    borderColor: "#9dc107",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    width: 360
  },
  switch: {
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto"
  },
  inputsAdultsKids: {
    flex: 1,
    alignSelf: "stretch",
  },
  inputsDatePicker: {
    flex: 1,
    alignSelf: "stretch",
  },
  inputsGoogleMaps: {
    flex: 1,
    alignSelf: "stretch",
    paddingTop: 0,
    minHeight: 25
  },
  inputsArrival: {
    padding: 5,
  },
  inputsDateOrigin: {
    padding: 5,
    marginTop: 20
  },
  inputsDateArrival: {
    padding: 5,
    marginTop: 20

  },
  childBox: {
    flexDirection: "column",
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: "auto"
  },
  switchTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9dc107",
    paddingLeft: 12
  },
  boxTitle: {
    //backgroundColor: "#eeeeff",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  boxOne: {
    //backgroundColor: "#eeeeff",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  boxDatePicker:{
    marginTop: -25,
    // flexGrow: 2,
    // flexShrink: 0,
    // flexBasis: "auto",
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 25,
    // flexDirection: 'column',
    // justifyContent: 'space-around'
  },
  title:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black'
  },
  subtitle:{
    fontFamily: 'Poppins-Medium',
    // fontSize: 20,
    // color: 'black'
  },
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
  boxInputsGoogle: {
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: "auto",
    paddingTop: 0,
    paddingBottom: 15,
    paddingHorizontal: 25,
    flexDirection: 'column',
    justifyContent: 'space-around'
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
  boxInputsAdultsKids: {
    paddingTop: 0,
    paddingBottom: 25,
    paddingHorizontal: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
  },
  boxThree: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  }
});
