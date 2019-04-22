import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font } from '../utils/Fonts';
export default class MultidestinationWidget extends Component {
  handlePress = () => {
    this.props.navigation.navigate("TransferWidget");
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.title}>¡Módulo no disponible!</Text>
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
  },
  title:{
    textAlign: 'center',
    fontFamily: Font.robotoMedium,
    color: '#ffffff',
    fontSize: 20
  }
});
