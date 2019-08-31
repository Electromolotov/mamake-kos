import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Imageslider from '../../components/ImageSlider';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Maps from "../../components/Maps";
import axios from 'axios'
import {API_URL} from 'react-native-dotenv'

// import Component 
import TextInputIklan from './../../components/TextInput/TextInputIklan'
import LabelIklan from './../../components/Label/LabelFormIklan'

const features = require('../../../data/fitur.json');
let featuresWithStatus = [];
features.map((fitur, index) => {
  featuresWithStatus.push({...fitur, status: false});
});

class IklanPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      type: 'Campur',
      rooms_available: '',
      address: '',
      full_address: '',
      latitude: -6.301686,
      longitude: 106.734972,
      price: '',
      widthRuangan: '',
      featuresChecked: '',
      city: '',
      desc: '',
      images: '',
      owner: '',
      ImageArrayFinal: null,
      jwt: undefined,
      provinsi: '',
      kota: '',
      kecamatan: '',
      allProv: [],
      allKabupaten: [],
      allKecamatan: [],
      features: featuresWithStatus,
      imagesSelected: []
    }
  }

  componentDidMount() {
    this._showAsynStorage();
    this._getDataProvinsi();
  }

  _getDataProvinsi = async () => {
    await axios.get('http://dev.farizdotid.com/api/daerahindonesia/provinsi')
      .then(res => {
        this.setState({
          allProv: res.data.semuaprovinsi
        });

      });
  }

  _showAsynStorage = async () => {
    try {
      let user = await AsyncStorage.getItem('token')
      if (user != null) {
        this.setState({
          jwt: user
        })
      } else {
        alert('Sesi Sudah Habis')
      };
    } catch (err) {
      alert(err)
    }

  }

  _handleSimpan = () =>{
    // const {jwt} = this.state;

    let dataKost = new FormData();
    dataKost.append('dormName', this.state.name)
    dataKost.append('address', this.state.full_address)
    dataKost.append('price', this.state.price)
    dataKost.append('roomAvailable', this.state.rooms_available)
    dataKost.append('sizeDorm', this.state.widthRuangan)
    dataKost.append('description', this.state.desc)
    dataKost.append('dormType', this.state.type)
    dataKost.append('longitude', this.state.longitude)
    dataKost.append('latitude', this.state.latitude)
    dataKost.append('images', this.state.imagesSelected)
    dataKost.append('city', this.state.city)
    dataKost.append('province', this.state.provinsi)
    
    console.log(dataKost)

    axios({
      url: 'https://mamikos-clone.herokuapp.com/api/v1/dorm',
      method: 'POST',
      data: dataKost,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        // Authorization: 'Bearer' + JSON.parse(jwt)
      }
    }).then(res => {
      alert('Data Iklan Berhasil Ditambahkan')
    }).catch(err => {
      alert(err)
      console.log(err)
      console.log(axios)
    })
  }

  
  _handlePickerChange = async (value, name) => {
    if (value) {
      this.setState({
        [name]: value
      });

      let url = 'http://dev.farizdotid.com/api/daerahindonesia/';
      if (name == 'provinsi') {
        url += `provinsi/${value.id}/kabupaten`;
        await axios.get(url)
        .then(res => {
          this.setState({
            allKabupaten: res.data.kabupaten
          })
        })
      } else if (name == 'kabupaten') {
        url +=  `provinsi/kabupaten/${value.id}/kecamatan`;
        await axios.get(url)
        .then(res => {
          this.setState({
            allKecamatan: res.data.kecamatan
          })
        });
      }
    }
  }


  handlePicker = () => ImagePicker.openPicker({
    multiple: true
  }).then(images => {
    console.log(images);
    let imgpatharray = []
    let imageData = [];
    images.map((item, index) => {
      imgpatharray.push({ src: { uri: item.path } })
      imageData.push(item);

      this.setState({
        ImageArrayFinal: imgpatharray
      });
    });

    this.setState({
      imagesSelected: imageData
    });
  });

  _handleChange = (nama) => {
    return (text) => {
      this.setState({
        [nama]: text
      })
    }
  }

  changeRegion = ({longitude, latitude}) => {
    this.setState({
      latitude,
      longitude
    })
  }


  _handleChangeFeatures = fiturName => {
    const index = this.state.features.findIndex(fitur => fitur.name === fiturName );
    const { features, featuresChecked } = this.state;
    features[index].status = !features[index].status;
    this.setState({
      features,
      featuresChecked: [...featuresChecked, fiturName]
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.containerHome}>
        <View style={styles.HeaderExplore}>
          <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" style={{ marginTop: 10 }} size={18} color={'#f7f7f7'}></Icon>
          </TouchableOpacity>
          <Text style={styles.textLogo}>Tambah Data Iklan</Text>
        </View>

        <View style={styles.formIklan}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LabelIklan label="Nama Kost" />
            <TextInputIklan value={this.state.name} namaValue="name" _handleChange={this._handleChange} placeholderEdit="Masukkan Nama Kost Disini" />
            
            {/* <LabelIklan label="Pilih Provinsi" />
            <View style={{borderBottomColor: '#2ecc71', borderBottomWidth: 1}}>
              <Picker
              selectedValue={this.state.provinsi}
              onValueChange={(itemValue, itemIndex) => this._handlePickerChange(itemValue, 'provinsi')}
              >
                <Picker.Item label="Pilih Provinsi" />
                {this.state.allProv && this.state.allProv.map((item, i) => (
                  <Picker.Item label={item.nama} value={item} />
                ))}
              </Picker>
            </View>

            <LabelIklan label="Pilih Kabupaten" />
            <View style={{borderBottomColor: '#2ecc71', borderBottomWidth: 1}}>
              <Picker
                selectedValue={this.state.kabupaten}
                onValueChange={(itemValue, itemIndex) => this._handlePickerChange(itemValue, 'kabupaten')}
              >
                <Picker.Item label="Pilih kabupaten" />
                {this.state.allKabupaten && this.state.allKabupaten.map((item, i) => (
                  <Picker.Item label={item.nama} value={item} />
                ))}
              </Picker>
            </View>

            <LabelIklan label="Pilih Kecamatan" />
            <View style={{borderBottomColor: '#2ecc71', borderBottomWidth: 1}}>
              <Picker
                selectedValue={this.state.kecamatan}
                onValueChange={(itemValue, itemIndex) => this._handlePickerChange(itemValue, 'kecamatan')}
              >
                <Picker.Item label="Pilih Kecamatan" />
                {this.state.allKecamatan && this.state.allKecamatan.map((item, i) => (
                  <Picker.Item label={item.nama} value={item} />
                ))}
              </Picker>
            </View> */}

            <LabelIklan label="Alamat Lengkap" />
            <TextInputIklan value={this.state.full_address} namaValue="full_address" _handleChange={this._handleChange} placeholderEdit="Masukkan Alamat Disini (contoh : nama jalan, kelurahan, kecamatan)" />

            <LabelIklan label="Kota" />
            <TextInputIklan value={this.state.city} namaValue="city" _handleChange={this._handleChange} placeholderEdit="Masukan nama kota" />

            <LabelIklan label="Provinsi" />
            <TextInputIklan value={this.state.provinsi} namaValue="provinsi" _handleChange={this._handleChange} placeholderEdit="Masukan nama Provinsi" />

            <Text style={styles.textLabel}>Cari area kost anda di Peta, kemudian pin peta ke lokasi kost kamu</Text>
            <View style={{ position: 'relative', marginTop: 5 }}>
              <TextInput
                style={styles.searchInput} placeholder='Cari Alamat kost' underline='transparent' placeholderTextColor="#e4e4e4" selectionColor='#2ecc71'
              />
              <Icon style={{ position: 'absolute', top: 3, left: 2, paddingTop: 15, paddingLeft: 5 }} name='search' color='#2ecc71' size={24}></Icon>
            </View>

            <View style={{ height: 250, backgroundColor: '#2ecc71', marginTop: 10 }}>
              <Maps
                region={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01
                }}
                changeRegion={this.changeRecgion}
                height={250}
                title="Cek tempat"
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5, }}>
                <LabelIklan label="Masukkan Latitude" />
                <Text style={{marginVertical: 20, borderBottomColor: '#2ecc71', borderBottomWidth: 1, paddingBottom: 10}}>{this.state.latitude}</Text>
              </View>

              <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5, }}>
                <LabelIklan label="Masukkan Longitude" />
                <Text style={{marginVertical: 20, borderBottomColor: '#2ecc71', borderBottomWidth: 1, paddingBottom: 10}}>{this.state.longitude}</Text>
              </View>
            </View>

            {this.state.ImageArrayFinal && (
              <Imageslider photos={this.state.ImageArrayFinal} />
            )}
            <TouchableOpacity onPress={this.handlePicker}>
              <View style={{ backgroundColor: '#2ecc71', flex: 1, marginTop: 5, padding: 5, borderRadius: 5 }}>
                <Text style={{ color: '#f7f7f7', textAlign: 'center' }}>
                  Pilih Foto
                 </Text>
              </View>
            </TouchableOpacity>

            <LabelIklan label="Pilih Tipe Kostan" />
            <View style={{borderBottomColor: '#2ecc71', borderBottomWidth: 1, marginBottom: 10}}>
              <Picker
              selectedValue={this.state.type}
              onValueChange={(itemValue, itemIndex) => this._handlePickerChange(itemValue, 'type')}
              >
                <Picker.Item label="Campur" value="Campur" />
                <Picker.Item label="Putra" value="Putra" />
                <Picker.Item label="Putri" value="Putri" />
              </Picker>
            </View>

            {/* <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5, }}>
                <LabelIklan label="Lebar Ruangan" />
                <TextInputIklan value={this.state.width} keyboardType="numeric" namaValue="width" _handleChange={this._handleChange} placeholderEdit="Lebar Ruangan" />
              </View>

              <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5, }}>
                <LabelIklan label="Panjang Ruangan" />
                <TextInputIklan value={this.state.length} keyboardType="numeric" namaValue="length" _handleChange={this._handleChange} placeholderEdit="Panjang Ruangan" />
              </View>
            </View> */}

            <LabelIklan label="Lebar Ruangan" />
            <TextInputIklan value={this.state.widthRuangan}  namaValue="widthRuangan" _handleChange={this._handleChange} placeholderEdit="L x P" />


            <LabelIklan label="Jumlah Ruangan" />
            <TextInputIklan value={this.state.rooms_available} keyboardType="numeric" namaValue="rooms_available" _handleChange={this._handleChange} placeholderEdit="Masukkan Alamat Disini (contoh : nama jalan, kelurahan, kecamatan)" />

            <LabelIklan label="Harga" />
            <TextInputIklan value={this.state.price} namaValue="price" keyboardType="numeric" _handleChange={this._handleChange} placeholderEdit="Masukkan Alamat Disini (contoh : nama jalan, kelurahan, kecamatan)" />

            <LabelIklan label="Deskripsi" />
            <TextInputIklan value={this.state.desc} namaValue="desc" _handleChange={this._handleChange} placeholderEdit="Masukkan Alamat Disini (contoh : nama jalan, kelurahan, kecamatan)" />

            {/* <LabelIklan label="Fasilitas Kost" />
            {this.state.features.map((fitur, index) => (
              <View key={index} style={styles.floatLeft}>
                <Checkbox
                  status={fitur.status ? 'checked' : 'unchecked'}
                  onPress={() => this._handleChangeFeatures(fitur.name)}
                  color="#2ecc71"
                />
                <Text style={{ paddingTop: 8, }}>{fitur.name}</Text>
              </View>
            ))} */}

            <TouchableOpacity onPress={this._handleSimpan}>
              <View style={{ backgroundColor: '#2ecc71', padding: 10, margin: 10, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', color: '#f7f7f7' }}>Submit</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default IklanPage;


const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  floatLeft: {
    flexDirection: "row"
  },
  inputStyle: {
    height: 50,
    borderWidth: 0,
    backgroundColor: '#f7f7f7',
    borderBottomColor: '#2ecc71',
  },
  searchInput: {
    marginTop: 7,
    backgroundColor: '#f7f7f7',
    borderColor: '#111',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 35,
    height: 50,
  },
  textLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10
  },
  formIklan: {
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  HeaderExplore: {
    textAlignVertical: 'center',
    padding: 7,
    flexDirection: 'row',
    flex: 1,
    height: 50,
    backgroundColor: '#2ecc71',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  textLogo: {
    padding: 10,
    paddingTop: 7,
    marginLeft: 15,
    color: '#f7f7f7',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 5,
  },
  imageLogo: {
    width: 20,
    height: 20,
    margin: 3,
  },
})