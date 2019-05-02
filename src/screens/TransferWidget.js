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
      quantity_kids: ""
    };
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

        <View style={[styles.boxOne]}>
          <Text style={[styles.switchTitle]}>Reservación de Traslado</Text>
        </View>

          <View style={[styles.boxOne]}>
            <Text style={[styles.switchTitle]}>IDA/VUELTA</Text>
            <Switch
              value={isSwitchOn}
              color="#9dc107"
              onValueChange={() => {
                this.setState({ isSwitchOn: !isSwitchOn });
              }}
            />
          </View>

          <View style={[styles.boxTwo]}>
            <View style={[styles.inputsOrigin]}>
              <InputOriginGoogleMaps
                dataForm={this.state}
                updateFormState={this.updateState.bind(this)}
              />
            </View>

            <View style={[styles.inputsArrival]}>
              <InputArrivalGoogleMaps
                dataForm={this.state}
                updateFormState={this.updateState.bind(this)}
              />
            </View>

            <View style={[styles.inputsDateOrigin]}>
              <InputsDatePicker
                dataForm={this.state}
                updateFormState={this.updateState.bind(this)}
              />
            </View>

            <View style={[styles.inputsDateArrival]}>
              <InputsAdultsKids
                dataForm={this.state}
                updateFormState={this.updateState.bind(this)}
              />
            </View>
          </View>

          <View style={[styles.boxThree]}>
              <Button
                icon="search"
                mode="contained"
                onPress={this.handlePress}
                style={styles.buttonColor}
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
  buttonColor: {
    backgroundColor: "#9dc107",
    borderColor: "#9dc107",
    borderRadius: 0,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "stretch",
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
  inputsOrigin: {
    padding: 5,
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
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  boxTwo: {
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: "auto",
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 18,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  boxThree: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: Dimensions.get('window').height / 25
  }
});
