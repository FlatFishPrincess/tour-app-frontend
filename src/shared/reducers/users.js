import { STORE_USER_ID, STORE_ADMIN, LOGOUT } from '../actions';
import { REQUEST_FETCH_USER } from '../actions/auth-action';
import { STORE_USER } from '../actions/auth-action';

const initialState = {};

const users = (state = {}, action) => {
  switch (action.type) {
    case STORE_USER_ID:
      console.log('reducer', action);
      return {
        ...state,
        userId: action.userId,
      }
    case STORE_ADMIN:
        console.log('reducer', action);
        return {
          ...state,
          adminId: action.adminId,
        }
    case STORE_USER:
      console.log('test?', action);
      return {
        ...state,
        user: action.user
      }
    case LOGOUT:
        console.log('reducer');
        return {};
    case REQUEST_FETCH_USER:
        return {
          ...state,
          loading: true
        }
    default:
      return state;
  }
}

export default users