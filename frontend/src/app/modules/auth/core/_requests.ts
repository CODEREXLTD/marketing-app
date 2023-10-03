import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = process.env.REACT_APP_API_URL;

export const GET_USER_BY_ACCESS_TOKEN_URL = `${API_URL}/user/verify-token/`;
export const REFRESH_TOKEN_URL = `${API_URL}/user/refresh-token/`;
export const LOGIN_URL = `${API_URL}/user/login/`;
export const REGISTER_URL = `${API_URL}/user/register/`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

/**
 * Logs a user in by sending a POST request to the login endpoint.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The user's password.
 *
 * @returns {Promise} A Promise that resolves with authentication information
 *                               when the login request is successful, or rejects with
 *                               an error if the login fails.
 */
export function login(email: string, password: string): Promise<any> {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  }, {
    timeout: 5000,
  });
}

/**
 * Registers a new user by sending a POST request to the registration endpoint.
 *
 * @param {string} email - The email address of the user to register.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} password - The user's chosen password.
 * @param {string} confirmPassword - The confirmation of the user's chosen password.
 *
 * @returns {Promise} A Promise that resolves when the registration request is successful,
 *                    or rejects with an error if the registration fails.
 */
export function register(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string
): Promise<any> {
  return axios.post(REGISTER_URL, {
    email,
    firstName: firstName,
    lastName: lastName,
    password,
    confirmPassword,
  });
}

/**
 * Sends a password reset request by sending a POST request to the password reset endpoint.
 *
 * @param {string} email - The email address of the user for whom the password reset is requested.
 *
 * @returns {Promise} A Promise that resolves with a result indicating
 *                                         the success of the password reset request, or
 *                                         rejects with an error if the request fails.
 */
export function requestPassword(email: string): Promise<any> {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

/**
 * Retrieves user information by providing an access token.
 *
 * @param {string} token - The access token used for authentication.
 *
 * @returns {Promise} A Promise that resolves with user information
 *                              when the request is successful, or rejects
 *                              with an error if the request fails.
 */
export function getUserByToken(token: string): Promise<any> {
  // Set the Authorization header with the Bearer token.
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  };

  return axios.get<UserModel>(GET_USER_BY_ACCESS_TOKEN_URL, config);
}

/**
 * Refreshes an authentication token by sending a POST request to the refresh token endpoint.
 *
 * @param {string} token - The authentication token to be refreshed.
 *
 * @returns {Promise<any>} A Promise that resolves with the refreshed token or relevant data
 *                        when the request is successful, or rejects with an error if the request fails.
 */
export function refreshAuthToken(token: string): Promise<any> {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post(REFRESH_TOKEN_URL, token, config);
}
