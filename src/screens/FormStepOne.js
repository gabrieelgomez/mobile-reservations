import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { Switch, RadioButton } from "react-native-paper";
import { Font } from '../utils/Fonts';


export default class FormStepOne extends Component {
  constructor(props) {
    super(props);
		this.state = { 
			checked: 'first',
		}
  }
  render() {
		const { checked } = this.state;
    return (
		<ImageBackground source={require('../images/backgroundLogin.jpg')} style={styles.backgroundImage}>
			<View style={styles.backgroundForm}>
				<View style={styles.loginInput}>
					<View style={styles.loginTitle}>
						<Text style={styles.loginItemTitle} >Datos de Reserva</Text>
					</View>
					<View style={styles.loginInputs}>
						<TextInput
							style={styles.inputLogin}
							mode="outlined"
							label='Origen'
							value={this.state.text}
							onChangeText={text => this.setState({ text })}
							theme={{ colors: { primary: '#9dc107'}}}
						/>
						<Divider style={styles.loginSeparator}></Divider>
						<TextInput
							style={styles.inputLogin}
							mode="outlined"
							label='Destino'
							value={this.state.text}
							onChangeText={text => this.setState({ text })}
							theme={{ colors: { primary: '#9dc107'}}}
						/>
						<Divider style={styles.loginSeparator}></Divider>
						<TextInput
							style={styles.inputLogin}
							mode="outlined"
							label='Cantidad de Adultos'
							value={this.state.text}
							onChangeText={text => this.setState({ text })}
							theme={{ colors: { primary: '#9dc107'}}}
						/>
						<Divider style={styles.loginSeparator}></Divider>
						<TextInput
							style={styles.inputLogin}
							mode="outlined"
							label='Cantidad de Niños'
							value={this.state.text}
							onChangeText={text => this.setState({ text })}
							theme={{ colors: { primary: '#9dc107'}}}
						/>
						<Divider style={styles.loginSeparator}></Divider>
						<TextInput
							style={styles.inputLogin}
							mode="outlined"
							label='Cantidad de Equipaje'
							value={this.state.text}
							onChangeText={text => this.setState({ text })}
							theme={{ colors: { primary: '#9dc107'}}}
						/>
					</View>
					<Divider style={styles.loginSeparator}></Divider>
					<Divider style={styles.loginSeparator}></Divider>
					<View style={styles.loginButtonSubmit}>
						<Button 
							mode="contained" 
							style={styles.loginButton}
							onPress={() => console.log('Pressed')}
							>
								Next
						</Button>
					</View>
				</View>
			</View>
		</ImageBackground>
    );
  }
}
 



const styles = StyleSheet.create({
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
	}
});
