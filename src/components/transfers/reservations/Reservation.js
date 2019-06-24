import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, ToastAndroid } from 'react-native';
import { Button, Divider } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Reservation extends Component {

  constructor(props){
    super(props);
    navigate = props = this.props.navigation.state.params

    this.onFocus      = this.onFocus.bind(this);
    this.onSubmit     = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.quantitySeatRef      = this.updateRef.bind(this, 'quantity_seat');
    this.hourOriginPickerRef  = this.updateRef.bind(this, 'hour_origin_picker');
    this.hourArrivalPickerRef = this.updateRef.bind(this, 'hour_arrival_picker');
    this.userDniRef           = this.updateRef.bind(this, 'user_dni');
    this.userNameRef          = this.updateRef.bind(this, 'user_name');
    this.userPhoneRef         = this.updateRef.bind(this, 'user_phone');
    this.userEmailRef         = this.updateRef.bind(this, 'user_email');
    this.userAddressRef       = this.updateRef.bind(this, 'user_address');


    this.state = {
      isLoading:       true,
      refreshing:      false,
      vehicleTitle:    'Vehículo...',
      dataVehicle:     navigate.dataVehicle,
      dataReservation: navigate.dataReservation
    }
  }

  componentDidMount(){
    this.setState({
      isLoading: false,
    });
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    ['quantity_seat', 'hour_origin_picker', 'hour_arrival_picker', 'user_dni', 'user_name', 'user_phone', 'user_email', 'user_address']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
          }
      });
  }

  onSubmit() {
    var dataVehicle = this.state.dataVehicle;
    var quantitySeatVehicle = dataVehicle.attributes.kit.quantity;

    let errors = {};
    var validates = 0;
    ['quantity_seat', 'hour_origin_picker', 'hour_arrival_picker', 'user_dni', 'user_name', 'user_phone', 'user_email', 'user_address']
      .forEach((name) => {
        let value = this[name].value();

        if (!value) {
          errors[name] = 'No puede ser vacío';
          validates++;
        } else {
          // Custom Validates
          switch (name) {
            case 'quantity_seat':
              if (parseInt(value) > parseInt(quantitySeatVehicle)){
                errors[name] = `Máximo equipaje es de ${quantitySeatVehicle}`;
                validates++;
              };
          }
        }
      });

    this.setState({ errors });
    if (validates > 0){
      ToastAndroid.show('No pueden existir campos vacíos. Por favor revisa tu formulario.', ToastAndroid.SHORT);
    } else if (validates == 0){
      ToastAndroid.show('El formulario está terminado.', ToastAndroid.SHORT);

      this.props.navigation.navigate('TransferCheckout', {
        dataVehicle: this.state.dataVehicle,
        dataWidgetReservation: this.state.dataReservation,
        dataReservation: this.state
      })

    }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.setState({refreshing: false})
  }

  render() {
    let { errors = {}, ...data } = this.state;

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

                      ref={this.quantitySeatRef}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.quantity_seat}
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Tipo de Traslado'
                      disabled
                      value={this.state.dataReservation.round_trip ? 'Ida/Vuelta' : 'Sólo Ida'}
                    />

                  </View>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Hora Origen'
                      keyboardType = 'numeric'

                      ref={this.hourOriginPickerRef}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.hour_origin_picker}
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Hora Destino'
                      keyboardType = 'numeric'

                      ref={this.hourArrivalPickerRef}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.hour_arrival_picker}
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
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Nombre y Apellido'
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
                      onChangeText={text =>
                        console.log(text)
                      }
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Nombre y Apellido'
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

                      ref={this.userDniRef}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.user_dni}
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='Nombre y Apellido'

                      ref={this.userNameRef}
                      autoCorrect={true}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.user_name}
                    />

                  </View>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      label='Teléfono'
                      keyboardType = 'phone-pad'

                      ref={this.userPhoneRef}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.user_phone}
                    />

                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputRight]}
                      tintColor='#9dc107'
                      label='E-mail'
                      keyboardType = 'email-address'

                      ref={this.userEmailRef}
                      autoCorrect={true}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.user_email}
                    />

                  </View>

                  <View style={[styles.boxInputFlexTwo]}>
                    <TextField
                      labelTextStyle={styles.fontFamily}
                      containerStyle={[styles.containerInput, styles.inputLeft]}
                      tintColor='#9dc107'
                      multiline={true}
                      label='Dirección de Factura'

                      ref={this.userAddressRef}
                      autoCorrect={true}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={this.onChangeText}
                      returnKeyType='next'
                      error={errors.user_address}
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
              raised={true}
              buttonStyle={styles.buttonSend}
              titleStyle={styles.buttonTitleStyle}
              onPress={this.onSubmit}
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
