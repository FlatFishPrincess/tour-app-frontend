import { combineReducers } from 'redux'
import users from './users'
import locations from './locations'

export default combineReducers({
  users,
  locations
})