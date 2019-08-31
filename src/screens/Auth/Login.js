import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Title, Button, IconButton } from "react-native-paper";
import axios from "axios";
import { connect } from 'react-redux';
import { functLogin, handlingEmail, handlingPassword } from './../../action/auth'

// import component 
import HeaderLogin from './../../components/Login/headerLogin'
import FormLogin from './../../components/Login/formLogin'
import ButtonLogin from './../../components/Login/buttonLogin'
import ButtonRegister from "./../../components/Login/buttonRegister";


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  _simpanAsynStorage = async () => {
    const { email, password } = this.state;
    const credential = {
      username: email,
      password
    }

    console.log(credential)

    await axios.post('https://mamikos-clone.herokuapp.com/user/login', credential)
    .then(async res => {
      await AsyncStorage.setItem('token', JSON.stringify(res.data.data.token));
      Keyboard.dismiss();
      alert('Login berhasil');
      this.props.navigation.navigate('Auth')
    })
    .catch(err => {
      this.setState({
        email: '',
        password: ''
      })
      alert('Email atau password salah')
    });
  }
    _showAsynStorage = async () => {
      try {
        let user = await AsyncStorage.getItem('user')
        if (user != null) {
          let data = JSON.parse(user)
          alert(data.email + ' ' + data.password)
        } else {
          alert('Sesi Sudah Habis')
        };
      } catch (err) {
        alert(err)
      }
  
    }



  _destroyAsynStorage = async () => {
    try {
      let destroy = await AsyncStorage.removeItem('user')
      this.props.navigate.navigation('Guest')
    } catch (err) {
      console.log(err)
      alert('Sesi Sudah Habis')
    }

  }

  _handleInputEmail = (text) => {
    this.setState({
      email: text
    })
  }

  _handleInputPassword = (text) => {
    this.setState({
      password: text
    })
  }

  _submitHandle = () => {
    alert('submit data = ' + 'Email = ' + this.state.email + 'Password = ' + this.state.password)
  }

 


  componentDidUpdate() {
    if (this.props.auth.berhasil == true) {
      alert('Berhasil')
      this.props.navigation.navigate('Auth')
    } else {
      
    }
  }

  render() {
    console.log(this.props.auth)
    return (
      <ScrollView style={styles.mainContainer}>
        <HeaderLogin navigation={this.props.navigation} />
        <FormLogin _handleInputEmail={this._handleInputEmail} _handleInputPassword={this._handleInputPassword} valueInput={{ email: this.state.email, password: this.state.password }} />
        <ButtonLogin _submitHandle={this._simpanAsynStorage} />
        <ButtonRegister navigation={this.props.navigation} />

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  headerContainer: {
    paddingTop: 30,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  logoIcon: {
    width: 50,
    height: 50,
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 30
  },
  floatLeft: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "row",
    alignItems: "flex-start"
  },
});
