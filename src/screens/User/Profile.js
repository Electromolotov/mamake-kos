import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import { createBottomTabNavigator } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getDataUser, functLogout } from './../../action/auth'





class Profile extends React.Component {


  constructor(){
    super() 
    this.state = {
      username: '',
      show: false
    }
  }

  _showAsynStorage = async () => {
    try {
      let user = await AsyncStorage.getItem('token')
        if (user != null) {
          let data = JSON.parse(user)
          alert(data)
        } else {
          alert('Kamu Belum Login')
        };
    } catch (err) {
      alert(err)
      
    }

  }

  _showAsynStorageUser = async () => {
    try {
      let user = await AsyncStorage.getItem('dataUser')
        if (user != null) {
          let data = JSON.parse(user)
         console.log(data)
         console.log(this.props.auth.fullname)
        } else {
          alert('Kamu Belum Login')
        };
    } catch (err) {
      alert(err)
      
    }

  }

  componentDidMount = () => {
    this.props.dispatch(getDataUser())
    console.log(this.props.auth.email)
   }

   componentDidUpdate = () => {
    if(this.props.auth.logout == true) {
      this.props.navigation.navigate('Guest')
    }
  }

  _destroyAsynStorage = async () => {
    try {
      await AsyncStorage.setItem('token', '');
      alert('Terima kasih');
      this.props.navigation.navigate('Guest')
    
    } catch (err) {
      console.log(err)
      alert('Sesi Telah Habis')
    }
  }


  handleOpen = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.containerHome}>
        <View>
          <ScrollView>
            <View style={styles.headerProfile}>
              <View style={{ flex: 1 }}>
                <Image
                  source={require('../../../assets/profil.jpg')}
                  style={styles.imageIcon} />
              </View>
              <View style={{ flex: 3, paddingTop: 3 }}>
                <Text style={styles.namaProfil}>{this.props.auth.fullname}</Text>
                <Text style={styles.notelepon}>{this.props.auth.phone}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity>
                  <Text style={styles.btnEditPro}>Sunting Profil</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ position: 'relative', flex: 1, }}>
              <View style={styles.headerRadius}>

              </View>
              <View style={styles.cardNav}>
                <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
                  <Text style={{ fontSize: 12, marginBottom: 5, color: '#2ecc71', fontWeight: 'bold' }}>Profil saya</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 1, marginTop: 10, }}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => navigate('kontrakSaya')}>
                    <Icon name="file-alt" style={{ textAlign: 'center' }} size={28} color={'#2ecc71'}></Icon>
                    <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 10, color: '#2ecc71' }}>Kontrak</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <Icon name="list-ul" style={{ textAlign: 'center' }} size={28} color={'#2ecc71'}></Icon>
                    <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 10, color: '#2ecc71' }}>Tagihan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <Icon name="hammer" style={{ textAlign: 'center' }} size={28} color={'#2ecc71'}></Icon>
                    <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 10, color: '#2ecc71' }}>Keluhan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <Icon name="store" style={{ textAlign: 'center' }} size={28} color={'#2ecc71'}></Icon>
                    <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 10, color: '#2ecc71' }}>Toko</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigate('ListBookPage')}>
              <View style={styles.cardProf}>
              <Icon name="clock" style={{ textAlign: 'center',  }} size={20} color={'#2ecc71'}></Icon>
              <Text style={{ textAlign: 'left', marginTop: 3, marginLeft: 5, fontSize: 10,  color: '#2ecc71' }}>Daftar Booking</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('ListIklanPage')}>
              <View style={styles.cardProf}>
              <Icon name="ad" style={{ textAlign: 'center',  }} size={20} color={'#2ecc71'}></Icon>
              <Text style={{ textAlign: 'left', marginTop: 3, marginLeft: 5, fontSize: 10,  color: '#2ecc71' }}>Daftar Iklan</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity >
              <View style={styles.cardProf}>
                <Icon name="user-circle" style={{ textAlign: 'center', }} size={20} color={'#2ecc71'}></Icon>
                <Text style={{ textAlign: 'left', marginTop: 3, marginLeft: 5, fontSize: 10, color: '#2ecc71' }}>Daftar Pesanan</Text>

              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleOpen}>
              <View style={styles.cardProf}>
                <Icon name="user-circle" style={{ textAlign: 'center', }} size={20} color={'#2ecc71'}></Icon>
                <Text style={{ textAlign: 'left', marginTop: 3, marginLeft: 5, fontSize: 10, color: '#2ecc71' }}>Peringatan</Text>

              </View>
            </TouchableOpacity>


            <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={this._showAsynStorageUser}>
              <View style={styles.cardProfbot}>
              <Icon name="wrench" style={{ textAlign: 'center',  }} size={20} color={'#2ecc71'}></Icon>
              <Text style={{ textAlign: 'left', marginTop: 3, marginLeft: 5, fontSize: 10,  color: '#2ecc71' }}>Pengaturan</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._showAsynStorage}>
              <View style={styles.cardProfbot}>
              <Icon name="info-circle" style={{ textAlign: 'center',  }} size={20} color={'#2ecc71'}></Icon>
              <Text style={{ textAlign: 'left', marginTop: 3, marginLeft: 5, fontSize: 10,  color: '#2ecc71' }}>Tunjukkan Sesi</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.dispatch(functLogout())}>
              <View style={styles.cardProfbot}>
              <Icon name="power-off" style={{ textAlign: 'center',  }} size={20} color={'#2ecc71'}></Icon>
              <Text style={{ textAlign: 'left', marginTop: 3, marginLeft: 5, fontSize: 10,  color: '#2ecc71' }}>Keluar</Text>
                  
              </View>
            </TouchableOpacity>
            </View>


          </ScrollView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.auth
  }
}

export default connect(mapStateToProps)(Profile);


const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  btnEditPro: {
    color: '#f7f7f7',
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 2,
  },
  headerProfile: {
    backgroundColor: '#2ecc71',
    height: 70,
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,    
    flexDirection: 'row'
  },
  cardNav: {
    flex: 1,
    height: 110,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    position: 'relative',
    marginTop: -50,
    marginHorizontal: 20,
    padding: 5,
  },
  imageIcon: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  cardProf:{
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
  },
  cardProfbot:{
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 20,
  },
  headerRadius: {
    backgroundColor: '#2ecc71',
    height: 70,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,

  },
  namaProfil: {
    color: '#f7f7f7',
    fontWeight: 'bold',
    fontSize: 15,
  },
  notelepon: {
    color: '#fff',
    fontSize: 10,
  }
})