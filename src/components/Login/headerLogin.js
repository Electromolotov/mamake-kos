import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput } from 'react-native'
import { Title, Button, IconButton } from 'react-native-paper'



export default class headerLogin extends Component {
    render() {
        return (
            <View>
                <View style={styles.closeContainer}>
                    <IconButton icon="close" color="#c3c3c3" onPress={() => this.props.navigation.goBack()}></IconButton>
                </View>
                <View style={styles.headerContainer}>
                    <Image source={require('./../../../assets/houses.png')} style={styles.logoIcon} />
                    <Title style={styles.headerTitle}>Masuk</Title>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    closeContainer: {
        position: "absolute",
        top: 10,
        right: 0
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

})