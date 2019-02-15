import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

export default class RadioButtonFlights extends Component {
  constructor(props) {
    super(props);
    this.state = { round_trip: "true" };
  }

  render() {
    return (
      <View style={styles.items}>
        <Text>Ida - Vuelta</Text>
        <RadioButton
          value="true"
          status={this.state.round_trip === "true" ? "checked" : "unchecked"}
          onPress={() => {
            this.props.updateFormState("round_trip", "true");
            this.setState({ round_trip: "true" });
          }}
        />
        <Text>Sólo Ida</Text>
        <RadioButton
          value="false"
          status={this.state.round_trip === "false" ? "checked" : "unchecked"}
          onPress={() => {
            this.props.updateFormState("round_trip", "false");
            this.setState({ round_trip: "false" });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
