import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Title, Button, IconButton } from "react-native-paper";
import { functRegister, handlingEmail, handlingPassword, handlingFullname, handlingPhone } from './../../action/auth'

import {connect} from 'react-redux'

class buttonRegister extends Component {
    render() {
        return (
            <View style={{ marginVertical: 20 }}>
                <Button mode="contained" style={styles.buttonSubmit} onPress={()=> this.props.dispatch(functRegister(
                    this.props.auth.fullname,
                    this.props.auth.email,
                    this.props.auth.phone,
                    this.props.auth.password,
                    this.props.auth.passwordconf,
                ))}>
                    Daftar
                </Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(buttonRegister);

const styles = StyleSheet.create({
    buttonSubmit: {
        backgroundColor: '#54d98c',
        fontWeight: "bold",
        shadowColor: "#2ecc71",
        shadowOpacity: 0.2,
        shadowOffset: {
            bottom: 2
        }
    }
})