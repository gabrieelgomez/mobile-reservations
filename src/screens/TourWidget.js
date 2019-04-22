import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font } from '../utils/Fonts';

export default class Profile extends Component {
  handlePress = () => {
    this.props.navigation.navigate("TransferWidget");
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
       
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4e4e56",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 500,
    height: 60,
    resizeMode: "contain"
  }
});
