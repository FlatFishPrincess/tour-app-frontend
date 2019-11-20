import { STORE_USER } from '../actions/actions';

const users = (state = {}, action) => {
  switch (action.type) {
    case STORE_USER:
      console.log('reducer', action);
      return {
        ...state,
        userId: action.userId,
      }
    default:
      return state
  }
}

export default users