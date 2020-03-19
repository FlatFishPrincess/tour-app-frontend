import { REQUEST_LOCATIONS, SUCCESS_LOCATIONS, REQUEST_CREATE_LOCATIONS } from '../actions/location-action';

const initialState = {};

const locations = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      console.log('reducer in locations?', action);
      return {
        ...state,
        loading: true
      };
    case SUCCESS_LOCATIONS:
      console.log('reducer fetched in locations?', action);
      return {
        ...state,
        loading: false,
        locations: action.locations
      };
    case REQUEST_CREATE_LOCATIONS:
      return {
        ...state,
        loading: false
        // location: action.data
      };
    default:
      return state;
  }
}

export default locations
