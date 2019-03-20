import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  RefreshControl
} from "react-native";
import InputsGoogleMaps from "../components/widget/transfers/InputsGoogleMaps";
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
          <Text style={[styles.switchTitle]}>IDA/VUELTA</Text>
          <Switch
            value={isSwitchOn}
            color="#43b7e8"
            onValueChange={() => {
              this.setState({ isSwitchOn: !isSwitchOn });
            }}
          />
        </View>

        <View style={[styles.boxTwo]}>
          <View style={[styles.inputsGoogleMaps]}>
            <InputsGoogleMaps
              dataForm={this.state}
              updateFormState={this.updateState.bind(this)}
            />
          </View>

          <View style={[styles.inputsDatePicker]}>
            <InputsDatePicker
              dataForm={this.state}
              updateFormState={this.updateState.bind(this)}
            />
          </View>

          <View style={[styles.inputsDatePicker]}>
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
    backgroundColor: "#43b7e8",
    borderColor: "#43b7e8",
    borderRadius: 0,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "stretch",
  },
  switch: {
    backgroundColor: "#000000",
    //marginVertical: 10,
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
    //backgroundColor: 'purple',
    paddingTop: 30,
    minHeight: 100
  },
  childBox: {
    //backgroundColor: "#000000",
    flexDirection: "column",
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: "auto"
  },
  switchTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#43b7e8"
  },
  boxOne: {
    //backgroundColor: "#eeeeff",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  boxTwo: {
    //backgroundColor: "gray",
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: "auto",
    paddingTop: 20,
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
  }
});
