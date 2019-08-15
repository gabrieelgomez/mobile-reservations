import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator, AsyncStorage, ScrollView } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { Switch } from "react-native-paper";
import { Font } from '../utils/Fonts';


export default class Profile extends Component {
  constructor(props) {
    super(props);
		this.state = {
			text: '',
			isHidden: false,
			showProgress: true,
      userData: '',
      userAvatar: 'https://ak1.picdn.net/shutterstock/videos/23800711/thumb/1.jpg'
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

      if (key == 'userData' && value != null){
        userData = JSON.parse(value)
        avatar   = `http://192.168.88.48:3000${userData['avatar']['url']}`
				this.setState({userData: userData, userAvatar: avatar})
			}

		})
	}

  componentDidMount(){
		this.getData('access-token')
		this.getData('client')
		this.getData('uid')
		this.getData('userData')
	}

  render() {
    return (
		<ImageBackground source={require('../images/backgroundLogin.jpg')} style={styles.backgroundImage}>
			<ScrollView>
        <View style={styles.backgroundForm}>

          {this.state.showProgress == false &&(

            <View style={styles.loginInput}>

    					<View style={styles.loginLogo}>
    						<Image
    								style={styles.logo}
    								source={require("../images/login_new.png")}
    								resizeMode="contain"
    							/>
    					</View>
    					<View style={styles.loginTitle}>
    						<Text style={styles.loginItemTitle} >Perfil</Text>
    					</View>

              <View style={styles.loginLogo}>
    						<Image
    								style={styles.logo}
                    source={{uri: this.state.userAvatar}}
    								resizeMode="contain"
    							/>
    					</View>

              <View style={styles.loginInputs}>
    						<TextInput
    							style={styles.inputLogin}
    							mode="outlined"
    							label='Nombre'
                  disabled = 'true'
    							value={this.state.userData['name']}
    							onChangeText={text => this.setState({ text })}
    							theme={{ colors: { primary: '#9dc107'}}}
    						/>
    						<Divider style={styles.loginSeparator}></Divider>
    						<TextInput
    							style={styles.inputLogin}
    							mode="outlined"
    							label='Correo'
                  disabled = 'true'
    							value={this.state.userData['email']}
    							onChangeText={text => this.setState({ text })}
    							theme={{ colors: { primary: '#9dc107'}}}
    						/>
    						<Divider style={styles.loginSeparator}></Divider>
                <TextInput
    							style={styles.inputLogin}
    							mode="outlined"
    							label='Teléfono'
                  disabled = 'true'
    							value={this.state.userData['phone']}
    							onChangeText={text => this.setState({ text })}
    							theme={{ colors: { primary: '#9dc107'}}}
    						/>
    						<Divider style={styles.loginSeparator}></Divider>
                <TextInput
    							style={styles.inputLogin}
    							mode="outlined"
    							label='DNI'
                  disabled = 'true'
    							value={this.state.userData['dni']}
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
    								Editar
    						</Button>
    					</View>
    					<View style={styles.loginCopyright}>
    						<Text style={styles.loginCopyrightTitle}>Receptivo Colombia © | 2019</Text>
    					</View>

    				</View>
          )}

          {this.state.showProgress && (
    				<View style={[styles.container_indicator, styles.horizontal_indicator]}>
    					<ActivityIndicator size="large" color="#0000ff" />
    				</View>
    			)}


        </View>
			</ScrollView>
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
	loginTitle:{
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

	},
	loginItemTitle:{
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
		paddingHorizontal: 15,
	},
	loginCopyrightTitle:{
		fontFamily: Font.robotoBold,
		color:"#9dc107",
		fontSize:  15
	}
});
