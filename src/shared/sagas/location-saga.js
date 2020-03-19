import axios from 'axios';
import { put, takeLatest, all, call, takeEvery } from 'redux-saga/effects';
import { REQUEST_LOCATIONS, SUCCESS_LOCATIONS, FAIL_LOCATIONS, REQUEST_CREATE_LOCATIONS, SUCCESS_CREATE_LOCATIONS, FAIL_CREATE_LOCATIONS } from '../actions/location-action';
import { BASE_URL } from '../../shared/utils/server.util';

function* fetchLocations() {
  try{
    const result = yield call(getLocations);
    if (!result.data) { throw new Error(); }
    yield put({ type: SUCCESS_LOCATIONS, loading: false, locations: result.data });
  }catch (error) {
    yield put({ type: FAIL_LOCATIONS, loading: false });
  }
}

async function getLocations() {
  const FETCH_LOCATIONS = `${BASE_URL}/get/location`;
  const res = await axios.get(FETCH_LOCATIONS);
  if (!res.status === 200) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return { data: res.data };
}

function* createLocation(action) {
  try{
    const result = yield call(saveLocations, action.data);
    if (!result) { throw new Error(); }
    yield put({ type: SUCCESS_CREATE_LOCATIONS, loading: false });
    yield call(fetchLocations);
    return true;
  }catch (error) {
    yield put({ type: FAIL_CREATE_LOCATIONS, loading: false });
  }
}

async function saveLocations(data) {
  const CREATE_LOCATION_URL = `${BASE_URL}/create/location`;
  const res =  await axios({
      method: 'post',
      url: CREATE_LOCATION_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
  });
  if (!res.status === 200) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return true;
}


function* watchCreateLocation() {
  yield takeEvery(REQUEST_CREATE_LOCATIONS, createLocation);
}

function* watchFetchLocation() {
  yield takeLatest(REQUEST_LOCATIONS, fetchLocations)
}

export default function* locationSaga() {
  yield all([
    watchFetchLocation(),
    watchCreateLocation()
  ]);
}

