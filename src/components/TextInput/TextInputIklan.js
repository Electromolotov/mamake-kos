import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'


export default class TextInputIklan extends React.Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        const {placeholder, _handleChange, namaValue, value, keyboardType} = this.props
        return (
            <View>
                <TextInput 
                    style={styles.inputStyle}
                    value={value} 
                    onChangeText={this.props._handleChange(namaValue)} 
                    placeholder={placeholder} 
                    underlineColor="#62bb66" 
                    underlineColorAndroid="#62bb66" 
                    selectionColor="#62bb66" 
                    placeholderTextColor="#ececec"
                    keyboardType={keyboardType || "default"}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        borderWidth: 0,
        backgroundColor: '#f7f7f7',
        borderBottomColor: '#62bb66'
    },
})
