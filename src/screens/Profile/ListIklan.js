import React from "react";
import { ActivityIndicator, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import { Paragraph } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

class listIklan extends React.Component {
  constructor() {
    super()
    this.state = {
      datakost: null,
      Loading: true
    }
  }

  toRupiah = (number) => {
    let rupiah = '';
    let revNumber = number.toString().split('').reverse().join('');
    for (var i = 0; i < revNumber.length; i++) if (i % 3 == 0) rupiah += revNumber.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  }

  renderItem = ({ item, index }) => {

    return (
      <View key={item.id} style={styles.cardContainer}>
        <TouchableOpacity>
          <View style={styles.cardListBooking}>
            <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: `${API_URL.replace('api/v1/', '')}${item.images.split(',')[0]}` }}
                  style={styles.imageIcon} />
              </View>
              <View style={{ flex: 2, padding: 5 }}>
                <Text style={{ color: '#2ecc71', fontWeight: 'bold' }}>{item.name}</Text>                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={styles.detailBook}>
                    <Text style={styles.textBook}>
                      Harga
                    </Text>
                    <Text style={styles.textBook}>
                      {this.toRupiah(item.price)}
                    </Text>
                  </View>
                  <View style={styles.detailBook}>
                    <Text style={styles.textBook}>
                      Ruangan : {item.rooms_avaible}
                    </Text>
                    <Text style={styles.textBook}>
                      Kota : {item.city}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardStatus}>
                  <Text style={{ fontSize: 10, textAlign: 'center', color: '#2ecc71' }}>Memuat</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
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

  getData = async () => {
    let user = await AsyncStorage.getItem('token')
    user = JSON.parse(user)
    await axios.get(
      `${API_URL}dorms`,
      { headers: { 'Authorization': 'Bearer ' + user } }
    ).then(res => {
      this.setState({
        datakost: res.data,
        Loading: false,
      })
    }).catch(err => {
      alert(err);
    });
  }


  componentDidMount() {
    this.getData()
  }

  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.containerHome}>
        <View style={styles.searchBar}>
          <View style={{ flex: 1, position: 'relative' }}>
            <Text style={{ color: '#f7f7f7', textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>
              Daftar Iklan
            </Text>
            <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ textAlign: 'center', paddingTop: 1 }} name='ios-arrow-back' color='#f7f7f7' size={30}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.Loading == true &&
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#2ecc71" />
            <Text style={{ textAlign: 'center', fontSize: 12, color: '#2ecc71' }}>Memuat..</Text>
          </View>
        }
        {this.state.Loading == false &&
          <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5, paddingBottom: 0, paddingTop: 0 }}>
            <FlatList
              data={this.state.datakost}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item.id}
            />
          </View>
        }

        <View style={{width: '100%', backgroundColor: '#f7f7f7', borderTopWidth: 0.5, borderColor: '#cecece', height: 50, borderTopLeftRadius: 2, borderTopRightRadius: 2}}>
          <TouchableOpacity onPress={() => navigate('iklanPage')}>
            <View style={{ backgroundColor: '#2ecc71', padding: 10, marginTop: 5, marginRight: 10, marginLeft: 10, marginBottom: 5, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', color: '#f7f7f7' }}>Tambah Iklan</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dorms: state.dorms
  }
}

export default connect(mapStateToProps)(listIklan);

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  cardStatus: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#2ecc71',
    width: '50%',
    padding: 2,
    borderRadius: 5,
  },
  cardListBooking: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e6e6e6',
    height: 100,
  },
  textBook: {
    fontSize: 12,
    color: '#cecece',
  },
  detailBook: {
    flex: 1,
    marginRight: 15,
  },
  searchBar: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#2ecc71',
    height: 60,
    marginBottom: 0,
    flexDirection: 'row'
  },
  seactInput: {
    paddingHorizontal: 40,
    padding: 5,
    height: 40,
    borderRadius: 5,
    borderColor: '#2ecc71',
    backgroundColor: '#d9e0e3',
    borderWidth: 1
  },
  imageIcon: {
    width: 100,
    height: '100%',
    borderRadius: 2,
  },
  touchable: {
    position: 'absolute',
    top: 3,
    left: 10,
  },
  cardContainer: {
    marginBottom: 10,
    marginTop: 2,
  },
  starIconContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  textDefault: {
    fontSize: 10,
    color: '#cecece'
  },
  textSeparator: {
    marginHorizontal: 5,
    marginBottom: 10
  },
  kostName: {
    color: '#979797',
    fontSize: 10,
    flex: 1
  },
  textPrice: {
    fontWeight: '600',
    marginTop: -5,
    fontSize: 12
  },
  textUpdated: {
    color: '#979797',
    fontSize: 10,
    flex: 1,
    marginLeft: 5,
    paddingBottom: 5
  }
})