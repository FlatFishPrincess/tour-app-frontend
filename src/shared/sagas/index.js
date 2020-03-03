import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLocations() {
  const FETCH_LOCATIONS = 'http://localhost:3000/get/location';
  const locations = yield axios.get(FETCH_LOCATIONS)
    .then(res => res.data )
    .catch(err => { console.log('error occured,', err); });

  yield put({ type: 'DONE_FETCH_LOCATIONS', locations: locations });
}

function* actionWatcher() {
     yield takeLatest('GET_LOCATIONS', fetchLocations)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}