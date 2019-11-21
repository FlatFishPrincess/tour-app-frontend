import { STORE_USER, STORE_USER_ID } from '../actions/actions';

const users = (state = {}, action) => {
  switch (action.type) {
    case STORE_USER_ID:
      console.log('reducer', action);
      return {
        ...state,
        userId: action.userId,
      }
    case STORE_USER:
      console.log('reducer', action);
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export default users