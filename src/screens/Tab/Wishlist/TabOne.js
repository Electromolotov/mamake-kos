import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation";

class TabOne extends React.Component {
  render() {
    return(
      <View style={styles.containerHome}>
       <View style={{alignItems: 'center'}}>
        <Image
                style={{height:50, width:50}}
                source={require('../../../../assets/houses.png')}
                />
        </View>

        <Text style={{fontSize:10, textAlign: 'center', fontWeight: '500', marginTop : 10}}>Tidak Ada</Text>
        <Text style={{fontSize:10, textAlign: 'center', color: '#afafaf', marginTop : 10, marginBottom:10}}>Segera Buat Wishlist Rumah Kesukaan Anda</Text>
          <View style={{paddingLeft:75, paddingRight:75}}>
          <Button
             title="Cari"
             color="#2ecc71"
             style={{flex:1, marginLeft:10, marginRight:10, fontSize: 10}}/>  
          </View>                 
      </View>
    )
  }
}

export default TabOne;

const styles = StyleSheet.create({
    containerHome: {
          flex: 1,
          backgroundColor:'#f7f7f7',
          padding:30,
          justifyContent: 'center',
      },
  })