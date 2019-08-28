import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, Image, Dimensions, ActivityIndicator, AsyncStorage, ToastAndroid, Linking } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import OfflineNotice from '../components/offline/OfflineNotice';
import { ButtonGroup, Button, ListItem } from 'react-native-elements';
import { Chip, List, withTheme, type Theme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions, StackActions } from 'react-navigation';

let ScreenHeight = Dimensions.get("window").height;

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			agencyCode: '',
			errorResponse: '',
			success: '',
			isAgency: false,
			currentUser: false,
			roundTrip: true,
		}
	}

  handlePress = () => {
    console.log('Pressed')
  };

	setAgency = () => {
		value = this.state.isAgency
		this.setState({isAgency: !value})
	}

	storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.warn('Error al guardar registro')
		}
	}

	getData(key){
		AsyncStorage.getItem(key).then((value) => {
			console.log(value)
			if (key == 'uid' && value != null){
				this.setState({showProgress: false, currentUser: true, userEmail: value});
			} else{
				this.setState({showProgress: false})
			}

			if (key == 'access-token' && value != null){
				this.setState({userAccessToken: value});
			}

			if (key == 'client' && value != null){
				this.setState({userClient: value});
			}

		})
	}

	async onLoginPressed() {
		this.setState({showProgress: true})
		return fetch('https://receptivocolombia.com/v1/auth/sign_in', {
														method: 'POST',
														headers: {
															'Accept': 'application/json',
															'Content-Type': 'application/json',
														},
														body: JSON.stringify({
															email: this.state.email,
															password: this.state.password,
															agency_code: this.state.agencyCode
														})
													})
					.then((response) => {
						if (response.status >= 200 && response.status < 300) {
							let accessToken = response.headers.get('access-token')
							let client      = response.headers.get('client')
							let uid         = response.headers.get('uid')
							this.storeData('access-token', accessToken);
							this.storeData('client', client);
							this.storeData('uid', uid);
							this.setState({
								userAccessToken: accessToken,
								userClient: client,
								userEmail: uid
							})
						}
						if (response.status == 500){
							ToastAndroid.show('Error in server, status 500.', ToastAndroid.SHORT);
						}
						return response;
					})
					.then((response) => response.json())
					.then((responseJson) => {
						if (responseJson == undefined){
							console.log('json undefined')
						}

						else if (responseJson.errors){
							console.log("error " + responseJson.errors[0]);
							ToastAndroid.show(responseJson.errors[0], ToastAndroid.SHORT);
							this.setState({showProgress: false, errorResponse: responseJson.errors[0]});
						}

						else if (responseJson.data){
							console.log(responseJson.data)
							this.storeData('userData', JSON.stringify(responseJson.data));
							this.setState({showProgress: false, currentUser: true, errorResponse: ''});
							this.props.navigation.navigate('App')
						}
						else {
							console.log(responseJson)
						}
					})
					.catch((error) =>{
						if(error == 'TypeError: Network request failed'){
							ToastAndroid.show('No hay conexión a internet. Intente más tarde.', ToastAndroid.SHORT);
						}
						this.setState({showProgress: false})
						// console.error(error);
					});
	}

	componentDidMount(){
		this.getData('access-token')
		this.getData('client')
		this.getData('uid')
		this.getData('userData')
	}

  toCreateAccount = () => {
    this.props.navigation.navigate('CreateAccount');
  }

	toProfile = () => {
    this.props.navigation.navigate('Profile');
  }

  render() {

    return (

			<ScrollView>
        <View
          style={styles.container}
        >

				{this.state.showProgress && (
					<View style={[styles.container_indicator, styles.horizontal_indicator]}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				)}

				{this.state.showProgress == false && (
					<View>

						<View>

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
									autoCapitalize = 'none'
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
									autoCapitalize = 'none'
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

							<Text style={[styles.fontCurrent, styles.errors]}>
								{this.state.errorResponse}
							</Text>

							<View style={styles.forgotPassword}>
								<Text style={[styles.fontCurrent, styles.titleForgot]} onPress={ ()=>{ Linking.openURL('https://receptivocolombia.com/users/sign_in')}}>¿Olvidaste tu contraseña?</Text>
							</View>

							<View style={[styles.boxButtonLogin]}>
								<Button
									title='Iniciar Sesión'
									type='outline'
									raised={true}
									buttonStyle={styles.buttonLogin}
									titleStyle={styles.buttonTitleStyle}
									onPress={this.onLoginPressed.bind(this)}
								/>

								<View style={styles.createAccount}>
									<Text style={[styles.fontCurrent, styles.titleCreateAccount]}>¿Aún no tienes una cuenta?</Text>
									<Text style={[styles.fontCurrent, styles.titleRegister]} onPress={ ()=>{ Linking.openURL('https://receptivocolombia.com/users/sign_in')}}>¡Registrate ahora!</Text>
								</View>
							</View>

						</View>

					</View>
				)}

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
	boxTitles: {
		flexGrow: 0,
		flexShrink: 1,
		flexBasis: "auto",
		paddingHorizontal: 25,
		// paddingTop: 25,
	},
	btnLogout:{
		color: 'red'
	},
	titleBtn:{
		marginTop: 5,
	},
	fontSize: {
		fontSize: 15
	},
	title:{
		fontFamily: 'Poppins-SemiBold',
		fontSize: 20,
		color: 'black'
	},
	subtitle:{
		fontFamily: 'Poppins-Medium',
		fontSize: 15,
		marginBottom: 10
	},
	errors: {
		color: 'red',
		paddingHorizontal: 45,
		marginBottom: 10
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
