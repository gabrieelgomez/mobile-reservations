import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { Button, Divider } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Reservation extends Component {

  constructor(props){
    super(props);
    navigate = props = this.props.navigation.state.params
    this.state ={ isLoading: true, refreshing: false, vehicleTitle: 'Vehículo...', dataVehicle: navigate.dataVehicle, dataReservation: navigate.dataReservation}
  }

  componentDidMount(){
    this.setState({
      isLoading: false,
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
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
            <Text style={styles.title}>Reservación de Traslado</Text>
            <Text style={styles.subtitle}>{this.state.dataVehicle.attributes.title['es']}</Text>
          </View>

          <View style={styles.boxTitles}>
            <Text style={styles.title}>Datos de Reserva</Text>
            <Divider style={[styles.dividerStyles, { width: 180 }]} />
            {
              this.state.dataReservation && (
                <View>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>Desde:  </Text>{this.state.dataReservation.origin_name}</Text>
                  <Text style={styles.subtitle}> <Text style={styles.strong}>Hasta:  </Text>{this.state.dataReservation.arrival_name}</Text>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Cantidad de Equipaje'
                      keyboardType = 'numeric'
                      // value={this.props.dataForm.quantity_adults}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Tipo de Traslado'
                      disabled
                      value={this.state.dataReservation.round_trip.toString()}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                  </View>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Hora Origen'
                      keyboardType = 'numeric'
                      // value={this.props.dataForm.quantity_adults}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Hora Destino'
                      keyboardType = 'numeric'
                      // value={this.props.dataForm.quantity_kids}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                  </View>

                </View>
              )
            }
          </View>


          <View style={styles.boxTitles}>
            <Text style={styles.title}>Datos de Viajeros</Text>
            <Divider style={[styles.dividerStyles, { width: 180 }]} />
            {
              this.state.dataReservation && (
                <View>

                  <Text style={styles.travellerTitle}> Viajero #1 </Text>
                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Identificación'
                      keyboardType = 'numeric'
                      // value={this.props.dataForm.quantity_adults}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Nombre y Apellido'
                      // value={this.props.dataForm.quantity_kids}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                  </View>

                  <Text style={styles.travellerTitle}> Viajero #2 </Text>
                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Identificación'
                      keyboardType = 'numeric'
                      // value={this.props.dataForm.quantity_adults}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Nombre y Apellido'
                      // value={this.props.dataForm.quantity_kids}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                  </View>

                </View>
              )
            }
          </View>


          <View style={styles.boxTitles}>
            <Text style={styles.title}>Datos de Facturación</Text>
            <Divider style={[styles.dividerBilling, { width: 180 }]} />
            {
              this.state.dataReservation && (
                <View>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Identificación'
                      keyboardType = 'numeric'
                      // value={this.props.dataForm.quantity_adults}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Nombre y Apellido'
                      // value={this.props.dataForm.quantity_kids}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                  </View>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Teléfono'
                      keyboardType = 'phone-pad'
                      // value={this.props.dataForm.quantity_adults}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='E-mail'
                      keyboardType = 'email-address'
                      // value={this.props.dataForm.quantity_kids}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                  </View>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      multiline={true}
                      label='Dirección de Factura'
                      // value={this.props.dataForm.quantity_adults}
                      onChangeText={text =>
                        console.log(text)
                      }
                    />
                  </View>

                </View>
              )
            }
          </View>

          <View style={[styles.boxBottonSend]}>
            <Button
              title='CONFIRMAR'
              type='outline'
              // icon={
              //   <Icon
              //     name='search'
              //     size={15}
              //     color='white'
              //     iconContainerStyle={styles.iconContainerStyle}
              //   />
              // }
              raised={true}
              buttonStyle={styles.buttonSend}
              titleStyle={styles.buttonTitleStyle}
              // onPress={this.handlePress}
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
  travellerTitle:{
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginBottom: -10
  },
  strong:{
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  dividerStyles: {
    height: 3,
    backgroundColor: '#e1e8ee',
    marginBottom: 15
  },
  dividerBilling: {
    height: 3,
    backgroundColor: '#e1e8ee',
  },
  imageStyle: {
    height: 200,
    borderBottomColor: '#d6d7da',
    borderBottomWidth: 1
  },
  boxBottonSend: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: 20,
    marginBottom: 30
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
    // marginLeft: 20,
  },
  iconContainer:{
    paddingRight: 20
  },

  boxInputFlexTwo: {
    paddingTop: 0,
    paddingBottom: 25,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: 'stretch',
  },
  containerInput:{
    flex: 1,
  },
  inputLeft:{
    paddingRight: 20
  },
  inputRight:{
    paddingLeft: 20
  },
  fontFamily:{
    fontFamily: 'Poppins-Light',
  },

});
