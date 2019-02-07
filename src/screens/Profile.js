import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Profile extends Component {

  handlePress = () => {
    this.props.navigation.navigate('TransferWidget');
  }

  render() {
    return (
      <View style = {styles.container}>
        <Text>
          Perfil
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
