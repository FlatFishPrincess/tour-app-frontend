export const REQUEST_FETCH_USER = 'REQUEST_FETCH_USER'
export const SUCCESS_FETCH_USER = 'SUCCESS_FETCH_USER'
export const FAIL_FETCH_USER = 'FAIL_FETCH_USER'

export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const SUCCESS_CREATE_USER =  'SUCCESS_CREATE_USER';
export const FAIL_CREATE_USER =  'FAIL_CREATE_USER';

export const REQUEST_LOGIN_USER = 'REQUEST_LOGIN_USER';
export const SUCCESS_LOGIN_USER = 'SUCCESS_LOGIN_USER';
export const FAIL_LOGIN_USER = 'FAIL_LOGIN_USER';

export const STORE_USER = 'STORE_USER'

export function getUsers() {
  return { type: REQUEST_FETCH_USER }
}

export function createUser(data){
  return { type: REQUEST_CREATE_USER, data }
}

export function loginUser(username, password){
  return { type: REQUEST_LOGIN_USER, data: { username, password} }
}