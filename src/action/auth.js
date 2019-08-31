import axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import AsyncStorage from '@react-native-community/async-storage';

export const handlingEmail = (email) => {
    return {
        type: 'EMAIL_HANDLING',
        payload: email
    }
}

export const handlingPassword = (password) => {
    return {
        type: 'PASSWORD_HANDLING',
        payload: password
    }
}

export const handlingconfPassword = (confpassword) => {
    return {
        type: 'PASSWORDCONF_HANDLING',
        payload: confpassword
    }
}

export const handlingFullname = (fullname) => {
    return {
        type: 'FULLNAME_HANDLING',
        payload: fullname
    }
}

export const handlingPhone = (phone) => {
    return {
        type: 'PHONE_HANDLING',
        payload: phone
    }
}

export const handlingUsername = (username) => {
    return {
        type: 'USERNAME_HANDLING',
        payload: username
    }
}

export const functLogin = (email, password) => {
    data = {
        email: email,
        password: password
    }
    return {
        type: 'GET_USER',
        payload: axios.post(API_URL + '/user/login', data)
    }
}

export const functRegister = (fullname, email, phone, password, passwordkonf, username) => {
    if (password.toLowerCase() == passwordkonf.toLowerCase()) {
        data = {
            name : fullname,
            email : email,
            username : username,
            password: password
        }
        console.log(data)
        return {
            type: 'POST_USER',
            payload: axios.post(API_URL + '/user/register', data)
        }
    }
    else {
        return {
            type: 'PASSWORD_ERROR',
            payload: 'Password Tidak Sama'
        }
    }
}

export const getDataUser = () => {
    return {
        type: 'GET_DATAUSER',
        payload: AsyncStorage.getItem('dataUser')
    }
}

export const functLogout = () => {
    return {
        type: 'DELETE_DATAUSER'
    }
}
//http://mamikos-clone.herokuapp.com/api/v1/