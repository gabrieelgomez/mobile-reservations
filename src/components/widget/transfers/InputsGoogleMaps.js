import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class InputsGoogleMaps extends Component {

  render() {
    return (

      <View>

        <View>
          <GooglePlacesAutocomplete
            placeholder   = "Origen"
            minLength     = {2} // minimum length of text to search
            autoFocus     = {false}
            returnKeyType = {'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed = "false" // true/false/undefined
            fetchDetails      = {true}
            renderDescription = {row => row.description} // custom description render

            onPress = {(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              this.setLocality(data, details, 'origin_name');
              // console.log(data);
              // console.log(details);
              // debugger;
            }}

            getDefaultValue = {() => {
              return ''; // text input default value
            }}

            query = {{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyDt6Fm4Tge8PJpUNhByW314XyvQGJRpDFc',
              language: 'es', // language of the results
              // types: '(cities)', // default: 'geocode'
              components: 'country:col',
            }}

            styles = {{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}

            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            // nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            // GoogleReverseGeocodingQuery={{
            //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            // }}
            // GooglePlacesSearchQuery={{
            //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            //   rankby: 'distance',
            //   types: 'food',
            // }}

            filterReverseGeocodingByTypes = {[
              'locality',
              'administrative_area_level_3',
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            // predefinedPlaces={[homePlace, workPlace]}

            debounce = {200}
          />
        </View>

        <View>
          <GooglePlacesAutocomplete
            placeholder       = "Destino"
            minLength         = {2} // minimum length of text to search
            autoFocus         = {false}
            returnKeyType     = {'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed = "false" // true/false/undefined/auto
            fetchDetails      = {true}
            renderDescription = {row => row.description} // custom description render

            onPress = {(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              this.setLocality(data, details, 'arrival_name');
              // console.log(data);
              // console.log(details);
            }}

            getDefaultValue = {() => {
              return ''; // text input default value
            }}

            query = {{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyDt6Fm4Tge8PJpUNhByW314XyvQGJRpDFc',
              language: 'es', // language of the results
              // types: '(cities)', // default: 'geocode'
              components: 'country:col',
            }}

            styles = {{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}

            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            // nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            // GoogleReverseGeocodingQuery={{
            //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            // }}
            // GooglePlacesSearchQuery={{
            //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            //   rankby: 'distance',
            //   types: 'food',
            // }}

            filterReverseGeocodingByTypes = {[
              'locality',
              'administrative_area_level_3',
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            // predefinedPlaces={[homePlace, workPlace]}

            debounce= {200}
          />
        </View>

      </View>
    );
  }

  setLocality(data, details, id_input){

    var map;
    var locality;
    var departament;

    // $("#origin_name").focus(function () {
    //   $(this).select();
    // });
    //
    // $("#arrival_name").focus(function () {
    //   $(this).select();
    // });

    var place = details;
    var latitude = place.geometry.location.lat;
    var longitude = place.geometry.location.lng;

    // For each address administrative_area_level_1 in hash
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types;
      if (addressType.includes('administrative_area_level_1')) {
        departament = place.address_components[i].long_name;
        if (id_input == 'origin_name') {
          exception = validateExceptions(departament)
          this.props.updateFormState('origin_departament', exception)
        }
        else {
          exception = validateExceptions(departament);
          this.props.updateFormState('arrival_departament', exception)
        }
        break;
      }
    }

    function validateExceptions(exception) {
      switch (exception) {
        case 'Bogotá':
          exception = 'Cundinamarca';
          break;
      }
      return exception;
    }

    // For each address administrative_area_level_1 in hash

    // For each address locality in hash
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types;
      if (addressType.includes('locality')) {
        locality = place.address_components[i].long_name;
        if (id_input == 'origin_name') {
          this.props.updateFormState('origin_locality', locality)
          // console.log(`Desde: Departamento, ${exception}, Localidad, ${locality}`)
        }
        else {
          this.props.updateFormState('arrival_locality', locality)
          // console.log(`Hasta: Departamento, ${exception}, Localidad, ${locality}`)
        }
        break;
      }
    }
    // For each address locality in hash


    // For each address political in hash
    if (!locality) {
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types;
        if (addressType.includes('political')) {
          // debugger;
          locality = place.address_components[i].long_name;
          if (id_input == 'origin_name') {
            this.props.updateFormState('origin_locality', locality)
            // console.log(`Desde: Departamento, ${exception}, Localidad, ${locality}`);
          }
          else {
            this.props.updateFormState('arrival_locality', locality)
            // console.log(`Hasta: Departamento, ${exception}, Localidad, ${locality}`);
          }
          break;
        }
      }
    }
    // For each address political in hash

    if (id_input == 'origin_name') {
      this.props.updateFormState('origin_location', [latitude, latitude])
      this.props.updateFormState('origin_name', data.description)
    } else if (id_input == 'arrival_name') {
      this.props.updateFormState('arrival_location', [latitude, latitude])
      this.props.updateFormState('arrival_name', data.description)
    }

  }


}
