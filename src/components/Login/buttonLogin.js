import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput } from 'react-native'
import { Title, Button, IconButton } from 'react-native-paper'
import { connect } from 'react-redux';
import { functLogin, handlingEmail, handlingPassword }  from './../../action/auth'



class buttonLogin extends Component {
    render() {
        return (
            <View style={{ marginBottom: 20 }}>
                <Button mode="contained" style={styles.buttonSubmit} onPress={() => this.props.dispatch(functLogin(this.props.auth.email, this.props.auth.password))}>
                    Login
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

export default connect(mapStateToProps)(buttonLogin);


const styles = StyleSheet.create({
    buttonSubmit: {
        backgroundColor: '#54d98c',
        fontWeight: "bold",
        shadowColor: "#2ecc71",
        shadowOpacity: 0.2,
        shadowOffset: {
          bottom: 2
        }
      },
})