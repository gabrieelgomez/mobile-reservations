import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Keyboard
} from 'react-native';
import { Button } from 'react-native-paper';
import { TextField } from 'react-native-material-textfield';
import { ListItem } from 'react-native-elements'
import _ from 'lodash';

export default class Arrival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      latitude: 0,
      longitude: 0,
      searching: false,
      boxPredictions: false,
      notFoundDestinations: false,
      placeIdDestiny: false,
      locationPredictions: []
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );
  }

  async onChangeDestination(destination) {
    this.setState({ destination });
    apiKey = 'AIzaSyDaNTVWfKoSrUtonUqoZh0sS2fN6gUlMrM'
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
    this.refs.inputArrival.blur();
    console.log(jsonResult);
  }

  updatePropsState (name, locality, departament, latitude, longitude){
    this.props.updateFormState('arrival_name', name);
    this.props.updateFormState('arrival_location', [latitude, latitude]);
    this.props.updateFormState('arrival_departament', departament);
    this.props.updateFormState('arrival_locality', locality);
  }

  validateExceptions(exception) {
    switch (exception) {
      case 'Bogotá':
        exception = 'Cundinamarca';
        break;
      case 'Bogota':
        exception = 'Cundinamarca';
        break;
    }
    return exception;
  }

  validateAccent(exception) {
    switch (exception) {
      case 'Bogota':
        exception = 'Bogotá';
        break;
    }
    return exception;
  }

  parsedDestination(data, prediction){
    var place     = data.result;
    var latitude  = place.geometry.location.lat;
    var longitude = place.geometry.location.lng;
    var name      = prediction.description;
    var locality;
    var departament;

    // For each address administrative_area_level_1 in hash
    for (var i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types;
      if (addressType.includes('administrative_area_level_1')) {
        departament   = place.address_components[i].long_name;
        var exception = this.validateExceptions(departament);
        departament   = exception
        break;
      }
    }

    // For each address locality in hash
    for (var i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types;
      if (addressType.includes('locality') && (place.address_components[i].long_name != 'Colombia')) {
        locality = place.address_components[i].long_name;
        var locality   = this.validateAccent(locality);
        console.log(`Desde: Departamento, ${departament}, Localidad, ${locality}`)
        break;
      }
    }

    // For each administrative_area_level_1 in hash
    if (!locality) {
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types;
        if (addressType.includes('administrative_area_level_1') && (place.address_components[i].long_name != 'Colombia')) {
          locality = place.address_components[i].long_name;
          var locality   = this.validateAccent(locality);
          console.log(`Desde: Departamento, ${departament}, Localidad, ${locality}`)
          break;
        }
      }
    }

    // For each address political in hash
    if (!locality) {
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types;
        if (addressType.includes('political') && (place.address_components[i].long_name != 'Colombia')) {
          locality = place.address_components[i].long_name;
          var locality   = this.validateAccent(locality);
          console.log(`Desde: Departamento, ${departament}, Localidad, ${locality}`)
          break;
        }
      }
    }

    this.updatePropsState(name, locality, departament, latitude, longitude)
  }

  async pressedPrediction(prediction) {
    this.setState({
      locationPredictions: [],
      destination: prediction.description,
      placeIdDestiny: true
    })
    apiKey = 'AIzaSyDaNTVWfKoSrUtonUqoZh0sS2fN6gUlMrM';
    placeId = prediction.place_id;
    Keyboard.dismiss();
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
    const result = await fetch(apiUrl);
    const jsonResult = await result.json();
    console.log(jsonResult);
    this.parsedDestination(jsonResult, prediction);
    this.setState({placeIdDestiny: false})
    Keyboard;
  }

  render() {
    const locationPredictions = this.state.locationPredictions.map(
      prediction => (
        <ListItem
          key={prediction.id}
          onPress={() => this.pressedPrediction(prediction)}
          title={prediction.description}
          titleStyle={styles.titleBoxPredictions}
          leftIcon={{ name: 'place', color: '#c31717de' }}
          topDivider={true}
          bottomDivider={true}
          chevron={true}
        />

      )
    );

    return (
      <View style={styles.container}>
        <TextField
          labelTextStyle={styles.fontFamily}
          tintColor='#9dc107'
          label='Destino'
          selectTextOnFocus
          ref= 'inputArrival'
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
            <Button color='#053eca' loading='true' mode='text' onPress={() => console.log('Pressed')}>
            Buscando Destinos...
            </Button>
          }

          {
            this.state.placeIdDestiny &&
            <Button color='#053eca' loading='true' mode='text' onPress={() => console.log('Pressed')}>
            Guardando Destino...
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
  },
  fontFamily:{
    fontFamily: 'Poppins-Light',
  },
  titleBoxPredictions:{
    fontFamily: 'Poppins-Light',
    fontSize: 14
  }
});
