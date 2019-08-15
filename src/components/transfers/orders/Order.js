import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, AsyncStorage, Linking, Image } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import OfflineNotice from '../../offline/OfflineNotice'
import { Card, ListItem, Icon } from 'react-native-elements'

export default class Order extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, dataSource: [], refreshing: false, searching: 'Buscando resultados...'}
  }

  componentDidMount(){
    this.getData('uid')
    this.setState({
      isLoading: false
    });
  }

  getData(key){
		AsyncStorage.getItem(key).then((value) => {
			console.log(value)
			if (key == 'uid' && value != null){
				this.setState({refreshing: false, currentUser: true, userEmail: value});
        this.requestOrders(value)
			} else{
				this.setState({refreshing: false})
			}
		})
	}

  requestOrders(user) {
    return fetch(`http://192.168.88.48:3000/api/transfers/orders?user=${user}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == undefined){
          this.setState({
            searching: 'Oops..! Sin resultados disponibles.',
            refreshing: false
          })
        } else {
          console.log(responseJson)
          this.setState({ refreshing: false, searching: 'Traslados', dataSource: responseJson.data })
        }
      })
      .catch((error) => {
        if(error == 'TypeError: Network request failed'){
          this.setState({
            searching: 'Oops..! Intente de nuevo, deslice hacia abajo. Kindly check if the device is connected to stable cellular data plan or WiFi.',
            refreshing: false
          })
        }
      });
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.getData('uid')
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.boxTitles}>
            <Text style={styles.title}>Ordenes</Text>
            <Text style={styles.subtitle}>{this.state.searching}</Text>
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>N° Orden</DataTable.Title>
              <DataTable.Title>N° Factura</DataTable.Title>
              <DataTable.Title>Precio</DataTable.Title>
              <DataTable.Title>Estatus</DataTable.Title>
              <DataTable.Title>Estatus Pago</DataTable.Title>
            </DataTable.Header>
          </DataTable>

          <OfflineNotice ref = 'offlineNotice' />
          {
            this.state.dataSource.map((item, i) => (
              <DataTable.Row
                key = {item.id}
              >
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.invoice.token}</DataTable.Cell>
                <DataTable.Cell>${item.invoice.amount}</DataTable.Cell>
                <DataTable.Cell>{item.order.status}</DataTable.Cell>
                <StatusPay item={item}/>
              </DataTable.Row>
            ))
          }

          {
            this.state.dataSource.length <= 0 && (
              <Text style={styles.centerNotFound}>No existen órdenes registradas.</Text>
            )
          }
        </View>

      </ScrollView>
    );
  }

}

const StatusPay = (data) => {
  item = data.item
  if (item.order.price_total_pax == 0){
    return(
      <DataTable.Cell>Cotización</DataTable.Cell>
    );
  }

  else if (item.order.status_pay == 'pending'){
    return(
      <DataTable.Cell
        style={[{
          justifyContent: 'center',
          borderBottomColor: 'blue',
          borderBottomWidth: 1
        }]}
        onPress={() => {
          Linking.openURL(item.pay_to)
        }}
      >
        Pagar
      </DataTable.Cell>
    );
  }

  else if (item.order.status_pay == 'cancelled'){
    return(
      <DataTable.Cell>Cancelado</DataTable.Cell>
    );
    //span cancelar
  }

  else {
    return(
      <DataTable.Cell>Aprobado</DataTable.Cell>
    );
    // aprobado
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  boxTitles: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
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
    marginBottom: 10
  },
  containerCards: {
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: 'auto',
    paddingTop: 0,
    paddingBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerStyle:{
    borderRadius: 5,
    borderColor: '#868686'
  },
  boxDetails:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  titleCard: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: 'black',
    marginBottom: 10
  },
  titleDetails:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#000'
  },
  imageStyle: {
    height: 200,
    borderBottomColor: '#d6d7da',
    borderBottomWidth: 1
  },
  buttonReservation: {
    backgroundColor: '#9dc107',
    borderColor: '#9dc107',
    borderRadius: 5,
    // padding: 10,
    // width: 340
  },
  buttonTitleStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 20,
  },
  centerNotFound: {
    paddingTop: 30,
    paddingLeft: 15,
  }
});
