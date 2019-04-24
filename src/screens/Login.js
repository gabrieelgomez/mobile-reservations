import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator, AsyncStorage, ToastAndroid } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { Switch } from "react-native-paper";
import { Font } from '../utils/Fonts';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			agencyCode: '',
			error: '',
			success: '',
			isHidden: false,
			showProgress: true,
			currentUser: false
		}
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

	async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
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
														})
													})
					.then((response) => {
						if (response.status >= 200 && response.status < 300) {
							console.log(response);
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
						return response;
					})
					.then((response) => response.json())
						.then((responseJson) => {
							if (responseJson == undefined){
								console.log('json undefined')
							} else if (responseJson.errors){
								console.log("error " + responseJson.errors[0]);
								ToastAndroid.show(responseJson.errors[0], ToastAndroid.SHORT);
								this.setState({showProgress: false, error: responseJson.errors[0]});
							} else if (responseJson.data){
								console.log(responseJson.data)
								this.storeData('userData', JSON.stringify(responseJson.data));
								this.setState({showProgress: false, currentUser: true, error: ''});
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

	async signOut(){
		this.setState({showProgress: true})
		return fetch('https://receptivocolombia.com/v1/auth/sign_out', {
														method: 'DELETE',
														headers: {
															'Accept': 'application/json',
															'Content-Type': 'application/json',
															'access-token': this.state.userAccessToken,
															'client': this.state.userClient,
															'uid': this.state.userEmail
														}
													})
					.then((response) => response.json())
						.then((responseJson) => {
							this.setState({showProgress: false})
							if (responseJson.success){
								this.removeData('uid')
								this.removeData('client')
								this.removeData('access-token')
								this.setState({currentUser: false, userEmail: ''})
								ToastAndroid.show('¡Hasta Luego!', ToastAndroid.SHORT);
							} else {
								ToastAndroid.show('Error al cerrar sesión, intente de nuevo.', ToastAndroid.SHORT);
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

	// componentWillUnmount(){
	// 	this.setState({showProgress: true})
	// }

  toCreateAccount = () => {
    this.props.navigation.navigate('CreateAccount');
  }

	toProfile = () => {
    this.props.navigation.navigate('Profile');
  }

	render() {
		return (
		<ImageBackground source={require('../images/backgroundLogin.jpg')} style={styles.backgroundImage}>
			{this.state.showProgress && (
				<View style={[styles.container_indicator, styles.horizontal_indicator]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)}

			{this.state.showProgress == false && (

				<View style={styles.backgroundForm}>

					<View style={styles.loginInput}>
						<View style={styles.loginLogo}>
							<Image
									style={styles.logo}
									source={require("../images/login_new.png")}
									resizeMode="contain"
								/>
						</View>

						{this.state.currentUser == false && (
							<View>
								<View style={styles.loginSwitch}>
									<Text style={styles.loginSwitchTitle} >¿Eres agencia?</Text>
									<Switch
										value={this.state.isHidden}
										color="#9dc107"
										onValueChange={value => this.setState({ isHidden: value })}
									/>
								</View>
								<View style={styles.loginInputs}>
									<TextInput
										style={styles.inputLogin}
										mode="outlined"
										label='Correo'
										value={this.state.email}
										onChangeText={email => this.setState({ email })}
										theme={{ colors: { primary: '#9dc107'}}}
									/>
									<Divider style={styles.loginSeparator}></Divider>
									<TextInput
										style={styles.inputLogin}
										mode="outlined"
										label='Contraseña'
										secureTextEntry={true}
										value={this.state.password}
										onChangeText={password => this.setState({ password })}
										theme={{ colors: { primary: '#9dc107'}}}
									/>
									<Divider style={styles.loginSeparator}></Divider>
									<View>
									{
										this.state.isHidden ? <TextInput style={styles.inputLogin} mode="outlined" label='Código Agencia' value={this.state.agencyCode} onChangeText={agencyCode => this.setState({ agencyCode })} theme={{ colors: { primary: '#9dc107'}}} /> : null
									}
									</View>
								</View>
								<Divider style={styles.loginSeparator}></Divider>
								<Divider style={styles.loginSeparator}></Divider>
								<View style={styles.loginButtonSubmit}>
									<Button
										mode="contained"
										style={styles.loginButton}
										onPress={this.onLoginPressed.bind(this)}
										>
											Iniciar Sesión
									</Button>

									<Text style={styles.error}>
										{this.state.error}
									</Text>

								</View>
								<View style={styles.loginItems}>
									<Text style={styles.loginItemsTitle} onPress={this.toCreateAccount}>Crear Cuenta</Text>
									<Text style={styles.loginItemsTitle}>Recuperar Contraseña</Text>
								</View>
								<View style={styles.loginCopyright}>
									<Text style={styles.loginCopyrightTitle}>Receptivo Colombia © | 2019</Text>
								</View>
							</View>
						)}

						{this.state.currentUser && (
							<View>
								<Text style={styles.titleWelcome}>¡Bienvenido!</Text>

								<Text style={styles.emailWelcome}>{this.state.userEmail}</Text>

								<View style={styles.loginButtonSubmit}>
									<Button
										mode="contained"
										style={styles.loginButton}
										onPress={this.toProfile.bind(this)}
										>
											Mi Perfil
									</Button>
								</View>
								<View style={styles.loginButtonSubmit}>
									<Button
										mode="contained"
										style={styles.loginButton}
										onPress={this.signOut.bind(this)}
										>
											Cerrar Sesión
									</Button>
								</View>

							</View>
						)}
					</View>
				</View>

			)}
		</ImageBackground>
		);
	}
}




const styles = StyleSheet.create({
	container_indicator: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal_indicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
	backgroundImage: {
			flex: 1,
			resizeMode: 'stretch', // or 'stretch',
			justifyContent: 'center',
	},
	backgroundForm:{
		backgroundColor: '#0000004f',
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginForm:{
			backgroundColor: 'transparent',
			alignItems: 'center',
			justifyContent: 'center',
	},
	loginInput:{
		alignItems: 'stretch',
		backgroundColor: '#ffffff',
		paddingTop: 15,
		paddingBottom: 25,
		paddingHorizontal: 15,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,
		elevation: 9,
		width: 350
	},
	titleForm:{
		fontFamily: Font.robotoBold,
		color:"#4e4e56",
		fontSize: 22,
		textAlign: 'center',
	},
	inputLogin:{
		paddingBottom: 8,
	},
	buttonLogin:{
		marginTop: 5,
	},
	logo: {
		width: 500,
		height: 60,
		resizeMode: "contain"
	},
	loginLogo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
	},
	loginButton:{
		backgroundColor: "#9dc107",
		borderColor: "#9dc107",
	},
	loginSwitch:{
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

	},
	loginSwitchTitle:{
		fontFamily: Font.robotoMedium,
		color:"#9dc107",
		fontSize:  15
	},
	loginSeparator:{
		marginTop: 5,
	},
	loginButtonSubmit:{
		paddingVertical: 5,
	},
	loginItems:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	loginItemsTitle:{
		fontFamily: Font.robotoBold,
		color:"#4e4e56",
		fontSize:  15
	},
	loginCopyright:{
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	loginCopyrightTitle:{
		fontFamily: Font.robotoBold,
		color:"#9dc107",
		fontSize:  15
	},
	error: {
		color: 'red',
		paddingTop: 10
	},
	success: {
		color: '#13cc00',
		paddingTop: 10
	},
	titleWelcome:{
    textAlign: 'center',
    fontFamily: Font.robotoMedium,
    color: '#4e4e56',
    fontSize: 20
	},
	emailWelcome:{
    textAlign: 'center',
    fontFamily: Font.robotoMedium,
    color: '#4e4e56',
		fontSize: 15,
		paddingVertical: 20
  }
});
