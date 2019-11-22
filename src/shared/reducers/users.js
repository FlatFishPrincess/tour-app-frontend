import { STORE_USER, STORE_USER_ID, STORE_ADMIN } from '../actions/actions';

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
    case STORE_ADMIN:
        console.log('reducer', action);
        return {
          ...state,
          adminId: action.adminId,
        }
    default:
      return state
  }
}

export default users