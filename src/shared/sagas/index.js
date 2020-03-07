import { put, takeLatest, all } from 'redux-saga/effects';
import locationSaga from './location-saga';
import authSaga from  './auth-saga';

export default function* rootSaga() {
   yield all([
    locationSaga(),
    authSaga()
   ]);
}