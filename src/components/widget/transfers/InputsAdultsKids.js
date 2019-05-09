import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { TextField } from 'react-native-material-textfield';

export default class InputsAdultsKids extends Component {
  render() {
    return (
      <View style={[styles.boxInputsAdultsKids]}>
        <TextField
          labelTextStyle={styles.fontFamily}
          containerStyle={[styles.containerInputAdultsKids, styles.inputAdults]}
          tintColor='#9dc107'
          label='Adultos'
          keyboardType = 'numeric'
          value={this.props.dataForm.quantity_adults}
          onChangeText={text =>
            this.props.updateFormState("quantity_adults", text)
          }
        />

        <TextField
          labelTextStyle={styles.fontFamily}
          containerStyle={[styles.containerInputAdultsKids, styles.inputKids]}
          tintColor='#9dc107'
          label='Niños'
          keyboardType = 'numeric'
          value={this.props.dataForm.quantity_kids}
          onChangeText={text =>
            this.props.updateFormState("quantity_kids", text)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxInputsAdultsKids: {
    paddingTop: 0,
    paddingBottom: 25,
    paddingHorizontal: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
  },
  containerInputAdultsKids:{
    flex: 1,
  },
  inputAdults:{
    paddingRight: 20
  },
  inputKids:{
    paddingLeft: 20
  },
  fontFamily:{
    fontFamily: 'Poppins-Light',
  },
});
