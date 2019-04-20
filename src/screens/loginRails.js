import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  Text,
  Image,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

export default class Login extends Component {
  constructor(){
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
    }
  }
  redirect(routeName, accessToken){
    this.props.navigator.push({
      name: routeName
    });
  }
  storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }
  async onLoginPressed() {

    // destroy_v1_user_session GET /v1/auth/sign_out(.:format) devise_token_auth/sessions#destroy


    this.setState({showProgress: true})
    try {
      let response = await fetch('https://receptivocolombia.com/v1/auth/sign_in', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                email: this.state.email,
                                password: this.state.password,
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          console.warn('fuck bitch')
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
    }

  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Native on Rails
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        <Text style={styles.error}>
          {this.state.error}
        </Text>

        <ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

//Brand - Corporate colors
// $color-blue:#43b7e8;
// $color-yellow: #ffc600;
// $color-red:#e53124;
// $color-orange:#eb6b0a;
// $color-green: #9dc107;
// $color-gray:#4e4e56;
// $color-white:#ffffff;
