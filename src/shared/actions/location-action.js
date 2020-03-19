export const GET_LOCATIONS = 'GET_LOCATIONS'

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'
export const SUCCESS_LOCATIONS = 'SUCCESS_LOCATIONS'
export const FAIL_LOCATIONS = 'FAIL_LOCATIONS'

export const REQUEST_CREATE_LOCATIONS = 'REQUEST_CREATE_LOCATIONS';
export const SUCCESS_CREATE_LOCATIONS =  'SUCCESS_CREATE_LOCATIONS';
export const FAIL_CREATE_LOCATIONS =  'FAIL_CREATE_LOCATIONS';

export function getLocations() {
  return { type: REQUEST_LOCATIONS }
}

export function createLocation(data){
  return { type: REQUEST_CREATE_LOCATIONS, data }
}
