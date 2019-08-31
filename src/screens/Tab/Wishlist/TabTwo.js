import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight } from "react-native";
import { Paragraph } from "react-native-paper";
import { createBottomTabNavigator } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

import IklanKost from "../../../components/IklanKost";

class TabTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      dorms: []
    }
  }

  renderItem = ({ item, index }) => (
    <IklanKost
      data={item}
      index={index}
    />
  )

  componentDidMount = async () => {
    await axios.get('http://mamikos-clone.herokuapp.com/api/v1/dorms') //API
      .then(res => {
        this.setState({
          dorms: res.data.data
        });
      });
  }

  render() {
    const kosts = this.state.dorms;

    return (
      <View style={styles.containerHome}>
        <FlatList
          data={kosts}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

export default TabTwo;

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  imageIcon: {
    flex: 1,
    height: 150,
    borderRadius: 5,
  },
})