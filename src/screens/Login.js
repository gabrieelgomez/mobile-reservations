import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";

import { Font } from '../utils/Fonts';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
		<ImageBackground source={require('../images/backgroundLogin.jpg')} style={styles.backgroundImage}>
			<View style={styles.backgroundForm}>
			
				<View style={styles.loginInput}>
					<Text style={styles.titleForm}>Receptivo Colombia</Text>
					<TextInput
						style={styles.inputLogin}
						mode="outlined"
						label='Email'
						value={this.state.text}
						onChangeText={text => this.setState({ text })}
						theme={{ colors: { primary: '#9dc107'}}}
					/>
					<TextInput
						style={styles.inputLogin}
						mode="outlined"
						label='Password'
						value={this.state.text}
						onChangeText={text => this.setState({ text })}
						theme={{ colors: { primary: '#9dc107'}}}
					/>
					<Button 
					icon="add-a-photo" 
					mode="contained" 
					style={styles.buttonLogin}
					onPress={() => console.log('Pressed')}
					>
						Enviar
					</Button>
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
		paddingVertical: 10,
		paddingHorizontal: 10,
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
		paddingBottom: 8,
	}
});

