import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text, RefreshControl } from "react-native";
import InputOriginGoogleMaps from "../components/widget/transfers/InputOriginGoogleMaps";
import InputArrivalGoogleMaps from "../components/widget/transfers/InputArrivalGoogleMaps";
import InputsDatePicker from "../components/widget/transfers/InputsDatePicker";
import InputsAdultsKids from "../components/widget/transfers/InputsAdultsKids";
// import { Button } from "react-native-paper";
import OfflineNotice from "../components/offline/OfflineNotice";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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

        <View style={styles.boxTitles}>
          <Text style={styles.title}>Reservación de Traslado</Text>
          <Text style={styles.subtitle}>¡Reserva el traslado de tu preferencia, y viaja a donde quieras!</Text>
        </View>

        <View style={[styles.boxInputsGoogle]}>
          <InputOriginGoogleMaps
            dataForm={this.state}
            updateFormState={this.updateState.bind(this)}
          />

          <InputArrivalGoogleMaps
            dataForm={this.state}
            updateFormState={this.updateState.bind(this)}
          />
        </View>

        <View>
          <InputsDatePicker
            dataForm={this.state}
            updateFormState={this.updateState.bind(this)}
          />
        </View>

        <View>
          <InputsAdultsKids
            dataForm={this.state}
            updateFormState={this.updateState.bind(this)}
          />
        </View>

        <View style={[styles.boxBottonSend]}>
          <Button
            title='BUSCAR'
            type='outline'
            icon={
              <Icon
                name='search'
                size={15}
                color='white'
                iconContainerStyle={styles.iconContainerStyle}
              />
            }
            raised={true}
            buttonStyle={styles.buttonSend}
            titleStyle={styles.buttonTitleStyle}
            onPress={this.handlePress}
          />
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
  },
  boxTitles: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  title:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black'
  },
  subtitle:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
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
  boxBottonSend: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonSend: {
    backgroundColor: "#9dc107",
    borderColor: "#9dc107",
    borderRadius: 5,
    padding: 10,
    width: 360
  },
  buttonTitleStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 20,
  },
  iconContainer:{
    paddingRight: 20
  }
});
