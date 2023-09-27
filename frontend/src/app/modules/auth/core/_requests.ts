import axios from 'axios';
import { AuthModel, UserModel } from './_models';

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/user/verify-token/`
export const LOGIN_URL = `${API_URL}/user/login/`
export const REGISTER_URL = `${API_URL}/user/register/`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        email,
        password,
    })
}

// Server should return AuthModel
export function register(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string
) {
    return axios.post(REGISTER_URL, {
        email,
        firstName: firstName,
        lastName: lastName,
        password,
        confirmPassword,
    })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {    
    // Set the Authorization header with the Bearer token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };    
    return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, { headers: {"Authorization" : `Bearer ${token}`} });
}
