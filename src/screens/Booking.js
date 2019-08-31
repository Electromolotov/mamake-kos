import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Appbar, IconButton } from "react-native-paper";
import { Picker, Button } from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL } from "react-native-dotenv";
import AsyncStorage from "@react-native-community/async-storage";
import KostFeatures from "../components/KostFeatures";
import { connect } from 'react-redux';
import { getDataUser } from './../action/auth'

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      show: false,
      duration: 1,
      kost: {},
      loading: true
    }
  }

  componentDidMount = () => {
    this.props.dispatch(getDataUser());
    
    this._checkAuth();
    this.setState({
      loading: false,
      kost: this.props.navigation.getParam('kost', 'Tidak ada data')
    });
  }

  _checkAuth = () => {
    if (!this.props.auth.fullname) {
      alert('SIlahkan Login Untuk Melanjutkan!');
      this.props.navigation.navigate('Login');
    }
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: false,
      date,
    });
  }

  showCalendar = () => {
    this.setState({
      show: true
    });
  }

  changeDuration = (value) =>  {
    this.setState({
      duration: value
    });
  }

  formatDate = (date) => {
    const monthName = [
      "Januari", "Februari", "Maret",
      "April", "May", "Juni", "Juli",
      "Agustus", "September", "Oktober",
      "November", "Desember"
    ];
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth();
    let years = date.getFullYear();

    return day + ' ' + monthName[month] + ' ' + years;
  }

  toRupiah = (number) => {
    let rupiah = '';		
    let revNumber = number.toString().split('').reverse().join('');
    for(var i = 0; i < revNumber.length; i++) if(i%3 == 0) rupiah += revNumber.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }

  _handleBooking = async () => {
    const {kost, date, duration} = this.state;
    const jwt = await AsyncStorage.getItem('token');
    const dataPost = {
      dorm_id: kost.id,
      price: kost.price,
      date_entries: new Date(date),
      duration
    }
    
    axios.post(
      API_URL + 'booking',
      dataPost,
      {headers: {'Authorization': 'Bearer ' + JSON.parse(jwt)}}
    ).then(res => {
      alert('Kost telah dimasukan ke daftar booking');
      this.props.navigation.navigate('ListBookPage');
    }).catch(err => {
      alert(err);
    });
  }

  render() {
    const { show, date, kost, loading } = this.state;

    if (loading == true) {
      return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text>Memuat</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: "#2ecc71"}}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Booking" />
        </Appbar.Header>
        <ScrollView style={styles.mainContainer}>
          <View style={[styles.bookContainer, styles.flexLeft]}>
            <View style={{flex: 1, paddingVertical: 10}}>
              <Text style={styles.headingGrey}>Tanggal Masuk</Text>
              <TouchableOpacity onPress={this.showCalendar}>
                <Text style={styles.dateText}>{this.formatDate(date)}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, paddingVertical: 10}}>
              <Text style={styles.headingGrey}>Durasi Sewa</Text>
              <Picker
                note
                mode="dropdown"
                selectedValue={this.state.duration}
                onValueChange={this.changeDuration}
              >
                <Picker.Item label="1 bulan" value="1" />
                <Picker.Item label="6 bulan" value="6" />
                <Picker.Item label="1 tahun" value="12" />
                <Picker.Item label="2 tahun" value="24" />
                <Picker.Item label="3 tahun" value="36" />
              </Picker>
            </View>
          </View>
          <View style={[styles.detailKostContainer, styles.flexLeft]}>
            <View style={{flex: 4, alignContent: "stretch"}}>
              <Image
                source={{uri: `${API_URL.replace('api/v1/', '')}${kost.images.split(',')[0]}`}}
                style={{height: 100, width: 120}}
              />
            </View>
            <View style={{flex: 6}}>
              <Text>{kost.name}</Text>
              <KostFeatures 
                items={kost.features}
                size={20}
                style={[styles.flexLeft, {height: 30}]}
                text={false}
              />
              <Text style={{fontWeight: "bold", marginTop: 20}}>{this.toRupiah(kost.price)} / bulan</Text>
            </View>
          </View>
          <View>
            <View style={styles.flexLeft}>
              <View>
                <Text style={styles.textBold}>Data pemesan</Text>
              </View>
            </View>
            <View style={[styles.flexLeft, {marginVertical: 5}]}>
              <View style={{flex: 1}}>
                <Text>Nama</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.textBold, styles.textRight]}>{this.props.auth.fullname}</Text>
              </View>
            </View>
            <View style={[styles.flexLeft, {marginVertical: 5}]}>
              <View style={{flex: 1}}>
                <Text>Email</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.textBold, styles.textRight]}>{this.props.auth.email}</Text>
              </View>
            </View>
            <View style={[styles.flexLeft, {marginVertical: 5}]}>
              <View style={{flex: 1}}>
                <Text>No. Telp</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.textBold, styles.textRight]}>{this.props.auth.phone}</Text>
              </View>
            </View>
           
          </View>
          { show && (
            <DateTimePicker value={date}
              mode="date"
              display="calendar"
              onChange={this.setDate} />
          )}
        </ScrollView>
        <View style={styles.footerContainer}>
          <Button full info block style={{borderRadius: 5}} onPress={this._handleBooking}>
            <Text style={styles.buttonText}>Book</Text>
          </Button>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Booking);

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    flex: 1
  },
  flexLeft: {
    flexDirection: "row"
  },
  bookContainer: {
    borderBottomColor: "#d5d5d5",
    borderBottomWidth: 1
  },
  headingGrey: {
    color: "grey",
    fontSize: 12
  },
  dateText: {
    paddingTop: 4
  },
  detailKostContainer: {
    marginVertical: 15,
    borderBottomColor: "#d5d5d5",
    borderBottomWidth: 1,
    paddingBottom: 15
  },
  textBold: {
    fontWeight: "700"
  },
  textRight: {
    textAlign: "right"
  },
  footerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    margin: 5
  },
  buttonText: {
    color: "#f7f7f7",
    textTransform: "uppercase",
    fontWeight: "bold"
  }
})