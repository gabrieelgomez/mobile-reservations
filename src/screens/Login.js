import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import OfflineNotice from '../components/offline/OfflineNotice';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TransferWidget extends Component {
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

  handlePress = () => {
    console.log('Pressed')
  };


  render() {
    return (
      <ScrollView>
        <View
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >

				<View style={styles.loginLogo}>
					<Image
							style={styles.logo}
							source={require('../images/login_new.png')}
							resizeMode='contain'
						/>
				</View>

        <View style={[styles.boxInputs]}>
					<TextField
						containerStyle={styles.containerInput}
						labelTextStyle={styles.fontFamily}
						tintColor='#9dc107'
						label='E-mail'
						selectTextOnFocus
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>

					<TextField
						containerStyle={styles.containerInput}
						labelTextStyle={styles.fontFamily}
						tintColor='#9dc107'
						label='Contraseña'
						selectTextOnFocus
						secureTextEntry={true}
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
					<View style={styles.forgotPassword}>
						<Text style={[styles.fontCurrent, styles.titleForgot]} onPress={this.handlePress}>¿Olvidaste tu contraseña?</Text>
					</View>
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
  container: {
    flex: 1,
    flexDirection: 'column',
		backgroundColor: '#fff'
  },
	fontFamily:{
		fontFamily: 'Poppins-Light',
	},
	fontCurrent:{
		fontFamily: 'Poppins-Medium',
		fontSize: 13,
	},
	logo: {
		width: 500,
		height: 60,
		resizeMode: 'contain'
	},
	loginLogo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 200
	},
	containerInput:{
		marginBottom: 20
	},
  boxInputs: {
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: 'auto',
    paddingTop: 0,
    paddingBottom: 15,
    paddingHorizontal: 45,
		marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
	forgotPassword:{
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	titleForgot:{
		color: '#9dc107'
	},
  boxButtonLogin: {
		marginTop: 50,
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
		flex: 1,
		flexDirection: 'row',
		margin: 20
	},
	titleCreateAccount:{

	},
	titleRegister:{
		marginLeft: 8,
		color: '#9dc107'
	}
});
