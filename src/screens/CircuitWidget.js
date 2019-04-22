import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Profile extends Component {
  handlePress = () => {
    this.props.navigation.navigate("TransferWidget");
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require("../images/receptivo_col.png")}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#43b7e8",
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

//Brand - Corporate colors
// $color-blue:#43b7e8;
// $color-yellow: #ffc600;
// $color-red:#e53124;
// $color-orange:#eb6b0a;
// $color-green: #9dc107;
// $color-gray:#4e4e56;
// $color-white:#ffffff;
