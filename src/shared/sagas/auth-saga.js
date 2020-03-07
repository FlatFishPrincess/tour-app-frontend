import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import { REQUEST_ADMIN_LOGIN, SUCCESS_ADMIN_LOGIN } from '../actions';
import { BASE_URL } from '../../shared/utils/server.util';

function* fetchLogin() {
  const FETCH_LOCATIONS_URL = `${BASE_URL}/get/location`; // 'http://localhost:3000/get/location';
  const locations = yield axios.get(FETCH_LOCATIONS_URL)
    .then(res => res.data )
    .catch(err => { console.log('error occured,', err); });

  yield put({ type: SUCCESS_ADMIN_LOGIN, locations: locations });
}

function* watchAdminLogin() {
  yield takeLatest(REQUEST_ADMIN_LOGIN, fetchLogin)
}

export default function* locationSaga() {
  yield all([
    watchAdminLogin()
  ]);
}

