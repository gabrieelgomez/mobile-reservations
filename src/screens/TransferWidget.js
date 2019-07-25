import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text, RefreshControl, AsyncStorage } from "react-native";
import InputOriginGoogleMaps from "../components/widget/transfers/InputOriginGoogleMaps";
import InputArrivalGoogleMaps from "../components/widget/transfers/InputArrivalGoogleMaps";
import InputsDatePicker from "../components/widget/transfers/InputsDatePicker";
import InputsAdultsKids from "../components/widget/transfers/InputsAdultsKids";
import OfflineNotice from "../components/offline/OfflineNotice";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TransferWidget extends Component {
  constructor(props) {
    super(props);
    today    = new Date();
    nextDay  = new Date().setDate(today.getDate()+1);
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
      flight_origin_picker: today.toLocaleDateString('en-GB'),
      flight_arrival_picker: new Date(nextDay).toLocaleDateString('en-GB'),
      round_trip: true,
      quantity_adults: "2",
      quantity_kids: "",
      sendDisabled: true
    };
    console.log(this.state)
  }

  updateState(key, value) {
    console.log(key, value)
    this.setState({ [key]: value }, () => {
      var {origin_locality, arrival_locality, origin_departament, arrival_departament, flight_origin_picker, flight_arrival_picker, quantity_adults} = this.state;
      quantity_adults = parseInt(quantity_adults);
      if (isNaN(quantity_adults)){
        quantity_adults = 0
        this.setState({ sendDisabled: true});
      }

      if (origin_locality && arrival_locality && origin_departament && arrival_departament && flight_origin_picker && flight_arrival_picker && quantity_adults>0){
        this.setState({ sendDisabled: false});
      }
    });
  }

  getData(key){
		AsyncStorage.getItem(key).then((value) => {
			if (key == 'uid' && value != null){
				this.setState({showProgress: false, currentUser: true, userEmail: value});
			} else{
        this.props.navigation.navigate('Auth');
      }
      this.setState({showProgress: false})
		})
	}

  componentDidMount() {
    this.setState({
      isLoading: false
    });
    this.getData('uid')
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
            disabled={this.state.sendDisabled}
            disabledStyle={styles.buttonSendDisabled}
            disabledTitleStyle={styles.buttonTitleStyleDisabled}
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
    flexGrow: 2,
    flexShrink: 0,
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
  buttonSendDisabled: {
    backgroundColor: "#70727363",
    // borderColor: "#24292e",
    borderRadius: 5,
    // padding: 10,
    // width: 360
  },
  buttonTitleStyleDisabled: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 20,
  },
  iconContainer:{
    paddingRight: 20
  }
});
