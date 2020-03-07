import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchLocations() {
  const FETCH_LOCATIONS = 'http://localhost:3000/get/location';
  const locations = yield axios.get(FETCH_LOCATIONS)
    .then(res => res.data )
    .catch(err => { console.log('error occured,', err); });

  yield put({ type: 'DONE_FETCH_LOCATIONS', locations: locations });
}

function* watchLocation() {
  yield takeLatest('GET_LOCATIONS', fetchLocations)
}

export default function* locationSaga() {
  yield all([
    watchLocation()
  ]);
}

