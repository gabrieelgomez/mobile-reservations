import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, AsyncStorage, ToastAndroid } from 'react-native';
import { ListItem } from 'react-native-elements';
import TransferWidget from '../../screens/TransferWidget';
import { NavigationActions, StackActions } from 'react-navigation';

let ScreenHeight = Dimensions.get("window").height;

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			success: '',
			currentUser: false
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

	async signOut(){
		this.setState({showProgress: true})
		return fetch('http://192.168.88.48:3000/v1/auth/sign_out', {
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
								this.removeData('userData')
								this.setState({currentUser: false, userEmail: ''})
								ToastAndroid.show('¡Hasta Luego!', ToastAndroid.SHORT);
                this.props.navigation.navigate('Auth');
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

	redirectTo(params = null, that = null){
		switch (params) {
		  case 'Traslados':
		    this.props.navigation.navigate('TransferOrders');
		  default:
		    null
		    break;
		}
	}

	componentDidMount(){
		this.getData('access-token')
		this.getData('client')
		this.getData('uid')
		this.getData('userData')
	}

	toProfile = () => {
    this.props.navigation.navigate('Profile');
  }

  render() {

		const options = [
			{
				title: 'Mi Perfil',
				icon: 'account-circle'
			},
		  {
		    title: 'Traslados',
		    icon: 'directions-car'
		  },
		  {
		    title: 'Tours',
		    icon: 'map'
		  },
			{
				title: 'Circuitos',
				icon: 'directions-railway'
			},
			{
				title: 'Multidestinos',
				icon: 'flight-takeoff'
			},
		]

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


        {this.state.currentUser &&(

          <View>
            <View style={styles.loginLogo}>
              <Image
                  style={styles.logo}
                  source={require('../../images/login_new.png')}
                  resizeMode='contain'
                />
            </View>

            <View style={styles.boxTitles}>
              <Text style={styles.subtitle}>{'¡Bienvenido!, ' + this.state.userEmail}</Text>
            </View>

            <View>
              {
                options.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.title}
                    titleStyle={[styles.fontCurrent, styles.fontSize, styles.titleBtn]}
                    chevron={true}
                    topDivider={true}
                    bottomDivider={true}
                    onPress={this.redirectTo.bind(this, item.title)}
                    leftIcon={{ name: item.icon }}
                  />
                ))
              }
              <ListItem
                key={6}
                title='Cerrar Sesión'
                containerStyle={[styles.btnLogout]}
                titleStyle={[styles.fontCurrent, styles.fontSize, styles.titleBtn, styles.btnLogout]}
                chevron={true}
                topDivider={true}
                bottomDivider={true}
                leftIcon={{ name: 'exit-to-app', color: 'red' }}
                onPress={this.signOut.bind(this)}
              />

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
  container_logo:{
    flex: 1,
    flexDirection: "row",
   //backgroundColor: 'red',
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  logoNavbar: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    paddingLeft: 20,
  },
  title: {
    paddingLeft: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: -5,
  },
  titleList: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: -5,
  },
});
