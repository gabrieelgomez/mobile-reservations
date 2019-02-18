import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text, RefreshControl } from "react-native";
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
    })
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

    return (
      <View style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
        <View style={styles.box}>
          <View style={styles.item}>
            {/* <RadioButtonFlights
            dataForm={this.state}
            updateFormState={this.updateState.bind(this)}
          /> */}
            <Switch
              value={this.state.round_trip}
              onValueChange={() => { this.setState({ round_trip: !this.state.round_trip }) }}
            />
          </View>
          {/* <View style={styles.item}>
          <InputsGoogleMaps
            dataForm={this.state}
            updateFormState={this.updateState.bind(this)}
          />
        </View> */}
          <View style={styles.item}>
            <InputsDatePicker
              dataForm={this.state}
              updateFormState={this.updateState.bind(this)}
            />
          </View>

          <View style={styles.item}>
            <InputsAdultsKids
              dataForm={this.state}
              updateFormState={this.updateState.bind(this)}
            />
          </View>
        </View>

        <View style={styles.item}>
          <Button
            icon="search"
            mode="contained"
            onPress={this.handlePress}
            style={styles.buttonColor}
          >
            Buscar
          </Button>
        </View>
      </View>

      // <ScrollView
      //   refreshControl={
      //     <RefreshControl
      //       refreshing={this.state.refreshing}
      //       onRefresh={this._onRefresh}
      //     />
      //   }
      // >
      //   <OfflineNotice ref = 'offlineNotice' />
      //   <View style={{ flex: 1 }}>
      //     <RadioButtonFlights
      //       dataForm        = {this.state}
      //       updateFormState = {this.updateState.bind(this)}
      //     />

      //     <InputsGoogleMaps
      //       dataForm        = {this.state}
      //       updateFormState = {this.updateState.bind(this)}
      //     />

      //     <InputsAdultsKids
      //       dataForm        = {this.state}
      //       updateFormState = {this.updateState.bind(this)}
      //     />

      //     <InputsDatePicker
      //       dataForm        = {this.state}
      //       updateFormState = {this.updateState.bind(this)}
      //     />

      //     <Text>`Fecha Ida - {this.state.flight_origin_picker}`</Text>
      //     <Text>`Fecha Vuelta - {this.state.flight_arrival_picker}`</Text>

      //     <Button icon="search" mode="contained" onPress={this.handlePress}>
      //       Buscar
      //     </Button>

      //     <ActivityIndicator animating={this.state.isLoading} color={Colors.red800} />

      //   </View>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  box: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  item: {
    alignSelf: "stretch",
    backgroundColor: "transparent"
  },
  buttonColor: {
    backgroundColor: "#43b7e8"
  }
});
