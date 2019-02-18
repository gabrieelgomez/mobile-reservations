import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, ToastAndroid } from 'react-native';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {

  constructor(props){
    super(props);
    this.state = {isConnected: true}
  }

  connectivityChange() {
    fetch(`https://www.google.co.ve/`)
      .then((response) => {
        this.setState({
          isConnected: true,
        });
        ToastAndroid.show('Si hay conexión a internet.', ToastAndroid.SHORT);
      })
      .catch((error) =>{
        if(error == 'TypeError: Network request failed'){
          this.setState({
            isConnected: false,
          });
          ToastAndroid.show('No hay conexión a internet, deslice hacia abajo para recargar.', ToastAndroid.SHORT);
          // console.warn('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
        }
        // console.error(error);
      });
    // console.warn('isConnectedToInternet?', this.state.isConnected)
  }

  componentDidMount() {
    this.connectivityChange();
  }

  componentWillUnmount() {
    // console.warn('will unmount')
    // this.connectivityChange();
  }

  render() {
    return null;
  }
}

// render() {
//   if (!this.state.isConnected) {
//     return <MiniOfflineSign />;
//   }
//   return null;
// }

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;
