import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default class InputsAdultsKids extends Component {
  render() {
    return (
      <View style={styles.inputs}>
       <TextInput
            style={styles.input}
            mode="outlined"
            label="Adultos"
            keyboardType = 'numeric'
            value={this.props.dataForm.quantity_adults}
            onChangeText={text =>
              this.props.updateFormState("quantity_adults", text)
            }
            theme={{ colors: { primary: '#9dc107'}}}
          />
           <View style={styles.separator}></View>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Niños"
            keyboardType = 'numeric'
            value={this.props.dataForm.quantity_kids}
            onChangeText={text =>
              this.props.updateFormState("quantity_kids", text)
            }
            theme={{ colors: { primary: '#9dc107'}}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
    //backgroundColor: 'yellow'
  },
  input: {
    flex: 1
  },
  separator: {
    paddingHorizontal: 10
  }
});
