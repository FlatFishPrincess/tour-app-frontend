import { combineReducers } from 'redux'
import users from './users'
import locations from './locations'
import reviews from './reviews';

export default combineReducers({
  users,
  locations,
  reviews
})