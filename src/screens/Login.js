import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, Image, Dimensions } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import OfflineNotice from '../components/offline/OfflineNotice';
import { ButtonGroup, Button } from 'react-native-elements';
import { Chip, List, withTheme, type Theme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

let ScreenHeight = Dimensions.get("window").height;

export default class TransferWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			agencyCode: '',
			error: '',
			success: '',
			isAgency: false,
			showProgress: true,
			currentUser: false,
			selectedIndex: 0,
			roundTrip: true,
			flexScroll: 1
		}
		this.updateIndex = this.updateIndex.bind(this)
	}

  handlePress = () => {
    console.log('Pressed')
  };

	setAgency = () => {
		value = this.state.isAgency
		console.log(value)
		this.setState({isAgency: !value})
	}

	updateIndex (selectedIndex) {
    new_value = selectedIndex == 0 ? 0 : 1
    this.setState({selectedIndex: new_value})
  }

  render() {
    return (

			<ScrollView>
        <View
          style={styles.container}
        >

					<View style={styles.loginLogo}>
						<Image
								style={styles.logo}
								source={require('../images/login_new.png')}
								resizeMode='contain'
							/>
					</View>

					<View style={styles.loginSwitch}>
						<Chip
							mode='outlined'
							// icon='contacts'
							// selected={this.isAgency}
							style={styles.chipContainer}
							selectedColor='#9dc107'
							onPress={this.setAgency}
						>
							<Text style={styles.chipTitle}>¿Eres Agencia?</Text>
						</Chip>
					</View>

	        <View style={[styles.boxInputs]}>
						<TextField
							// containerStyle={styles.containerInput}
							labelTextStyle={styles.fontFamily}
							tintColor='#9dc107'
							label='E-mail'
							selectTextOnFocus
							value={this.state.email}
							onChangeText={email => this.setState({ email })}
						/>

						<TextField
							// containerStyle={styles.containerInput}
							labelTextStyle={styles.fontFamily}
							tintColor='#9dc107'
							label='Contraseña'
							selectTextOnFocus
							secureTextEntry={true}
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>

						{this.state.isAgency && (
							<TextField
								// containerStyle={styles.containerInput}
								labelTextStyle={styles.fontFamily}
								tintColor='#9dc107'
								label='Código Agencia'
								selectTextOnFocus
								secureTextEntry={true}
								value={this.state.agencyCode}
								onChangeText={agencyCode => this.setState({ agencyCode })}
							/>
						)}
	        </View>

					<View style={styles.forgotPassword}>
						<Text style={[styles.fontCurrent, styles.titleForgot]} onPress={this.handlePress}>¿Olvidaste tu contraseña?</Text>
					</View>

	        <View style={[styles.boxButtonLogin]}>
	          <Button
	            title='Iniciar Sesión'
	            type='outline'
	            raised={true}
	            buttonStyle={styles.buttonLogin}
	            titleStyle={styles.buttonTitleStyle}
	            onPress={this.handlePress}
	          />

						<View style={styles.createAccount}>
							<Text style={[styles.fontCurrent, styles.titleCreateAccount]}>¿Aún no tienes una cuenta?</Text>
							<Text style={[styles.fontCurrent, styles.titleRegister]} onPress={this.handlePress}>¡Registrate ahora!</Text>
						</View>
	        </View>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	fontFamily:{
		fontFamily: 'Poppins-Light',
	},
	fontCurrent:{
		fontFamily: 'Poppins-Medium',
		fontSize: 13,
	},
  container: {
		height: ScreenHeight/1.1,
    flexDirection: 'column',
		backgroundColor: '#fff'
  },
	loginLogo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 180
	},
	logo: {
		width: 500,
		height: 60,
		resizeMode: 'contain'
	},
	loginSwitch:{
		alignItems: 'flex-end',
		// marginTop: -10
	},
	chipContainer:{
		marginRight: 45,
	},
	chipTitle:{
		fontFamily: 'Poppins-Regular',
		color:'#9dc107',
		fontSize:  13,
	},
  boxInputs: {
    // flexGrow: 2,
    // flexShrink: 0,
    // flexBasis: 'auto',
    paddingTop: 0,
		paddingHorizontal: 45,
		// height: 'auto'
    // paddingBottom: 15,
		marginBottom: 25,
    // flexDirection: 'column',
    // justifyContent: 'space-around'
  },
	forgotPassword:{
		// justifyContent: 'center',
		alignItems: 'flex-end',
    paddingHorizontal: 45,
		marginBottom: 10,
	},
	titleForgot:{
		color: '#9dc107'
	},
  boxButtonLogin: {
		marginTop: 30,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonLogin: {
    backgroundColor: '#9dc107',
    borderColor: '#9dc107',
    borderRadius: 5,
    padding: 10,
    width: 320
  },
  buttonTitleStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
	createAccount:{
		flexDirection: 'row',
		margin: 20
	},
	titleRegister:{
		marginLeft: 8,
		color: '#9dc107'
	},
});
