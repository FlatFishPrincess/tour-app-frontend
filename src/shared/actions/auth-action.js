export const REQUEST_FETCH_USER = 'REQUEST_FETCH_USER'
export const SUCCESS_FETCH_USER = 'SUCCESS_FETCH_USER'
export const FAIL_FETCH_USER = 'FAIL_FETCH_USER'

export const REQUEST_CREATE_LOCATIONS = 'REQUEST_CREATE_LOCATIONS';
export const SUCCESS_CREATE_LOCATIONS =  'SUCCESS_CREATE_LOCATIONS';
export const FAIL_CREATE_LOCATIONS =  'FAIL_CREATE_LOCATIONS';

export function getUsers() {
  return { type: REQUEST_FETCH_USER }
}

export function createLocation(data){
  return { type: REQUEST_CREATE_LOCATIONS, data }
}
