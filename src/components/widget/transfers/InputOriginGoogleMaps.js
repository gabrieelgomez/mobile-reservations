import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Keyboard
} from 'react-native';
import { TextInput, Button, Divider, Avatar } from 'react-native-paper';
import _ from 'lodash';
import { TextField } from 'react-native-material-textfield';

//Show map... select location to go to
//Get location route with Google Location API
//Send driver request
//Wait for driver to arrive
//Get picked up by driver
//Let driver drive to location

export default class Passenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      latitude: 0,
      longitude: 0,
      searching: false,
      boxPredictions: false,
      notFoundDestinations: false,
      locationPredictions: []
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );
  }

  componentDidMount() {
    //Get current location and set initial region to this
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
    );
  }

  async onChangeDestination(destination) {
    this.setState({ destination });
    apiKey = 'AIzaSyDt6Fm4Tge8PJpUNhByW314XyvQGJRpDFc'
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input={${destination}}&language=es&components=country:col`;
    const result = await fetch(apiUrl);
    const jsonResult = await result.json();
    this.setState({
      searching: false,
      boxPredictions: true,
      locationPredictions: jsonResult.predictions
    });

    if (jsonResult.predictions == ''){
      this.setState({
        notFoundDestinations: true,
      });
    }

    console.log(jsonResult);
  }

  pressedPrediction(prediction) {
    console.log(prediction);
    Keyboard.dismiss();
    this.setState({
      locationPredictions: [],
      destination: prediction.description
    });
    Keyboard;
  }

  render() {
    const locationPredictions = this.state.locationPredictions.map(
      prediction => (
        <TouchableHighlight
          key={prediction.id}
          onPress={() => this.pressedPrediction(prediction)}
        >
          <Text style={styles.locationSuggestion}>
            {prediction.description}
          </Text>
        </TouchableHighlight>
      )
    );

    return (
      <View style={styles.container}>
        <TextField
          labelTextStyle={styles.fontFamily}
          tintColor='#9dc107'
          label='Origen'
          selectTextOnFocus
          value={this.state.destination}
          onChangeText={destination => {
            this.setState({ destination: destination, searching: true, boxPredictions: false, notFoundDestinations: false });
            this.onChangeDestinationDebounced(destination);
          }}
        />

        <ScrollView
          style={styles.scrollView}
        >
          {
            this.state.searching &&
            <Button loading='true' mode='text' onPress={() => console.log('Pressed')}>
            Buscando Destinos...
            </Button>
          }

          {
            this.state.notFoundDestinations &&
            <Text>Sin resultados que coincidan</Text>
          }

          {
            this.state.boxPredictions &&
            <View
              style={styles.boxPredictions}
            >
              {locationPredictions}
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locationSuggestion: {
    // backgroundColor: 'white',
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: '#9dc107'
  },
  scrollView:{
    backgroundColor: 'white',
    zIndex: 2,
    // position: 'absolute'
  },
  boxPredictions:{
    // zIndex: 2,
    // alignSelf: 'stretch'
    // backgroundColor: 'red',
  },
  contentContainer: {
    // position: 'absolute',
    zIndex: 2,
    backgroundColor: 'white',
  }
});
