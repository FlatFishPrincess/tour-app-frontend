import { GET_LOCATIONS, DONE_FETCH_LOCATIONS } from '../actions/actions';

const initialState = {};

const locations = (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      console.log('reducer in locations?', action);
      return {
        ...state,
        loading: true
      };
    case DONE_FETCH_LOCATIONS:
      console.log('reducer fetched in locations?', action);
      return {
        ...state,
        loading: false,
        locations: action.locations
      };
    // case STORE_USER:
    //   console.log('reducer', action);
    //   return {
    //     ...state,
    //     user: action.user,
    //   }
    // case STORE_ADMIN:
    //     console.log('reducer', action);
    //     return {
    //       ...state,
    //       adminId: action.adminId,
    //     }
    // case LOGOUT:
    //     console.log('reducer');
    //     return {};
    default:
      return state;
  }
}

export default locations
