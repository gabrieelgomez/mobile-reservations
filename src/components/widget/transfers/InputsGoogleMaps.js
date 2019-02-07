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
              console.log(data);
              console.log(details);
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
              console.log(data);
              console.log(details);
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
}
