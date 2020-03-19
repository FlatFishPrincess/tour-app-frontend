import axios from 'axios';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { REQUEST_ADMIN_LOGIN, SUCCESS_ADMIN_LOGIN, FAIL_ADMIN_LOGIN } from '../actions';
import { BASE_URL } from '../../shared/utils/server.util';
import { REQUEST_FETCH_USER, SUCCESS_FETCH_USER, FAIL_FETCH_USER } from '../actions/auth-action';

function* fetchLogin(action) {
  try{
    const result = yield call(loginAdmin, action.data);
    if (!result.success) { throw new Error(); }
    yield put({ type: SUCCESS_ADMIN_LOGIN, loading: false });
  }catch (error) {
    yield put({ type: FAIL_ADMIN_LOGIN, loading: false });
  }
}

async function loginAdmin({username, password}) {
  const FETCH_LOCATIONS_URL = `${BASE_URL}/login/admin`;
  const res = await axios({
    method: 'post',
    url: FETCH_LOCATIONS_URL,
    headers:{
      'Accept': 'application/json'
    },  
    data: {
      adminId: username,
      adminpassword: password
    }
  });
  if (!res.status === 200) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return { success: res.data };
}


function* fetchAllUsers(action) {
  try{
    const result = yield call(fetchUsers);
    if (!result.success) { throw new Error(); }
    console.log('fetchAllusers?', result);
    yield put({ type: SUCCESS_FETCH_USER, loading: false, users: result.data });
  }catch (error) {
    yield put({ type: FAIL_FETCH_USER, loading: false });
  }
}

async function fetchUsers() {
  const FETCH_USERS_URL = `${BASE_URL}/get/user`;
  const res = await axios.get(FETCH_USERS_URL);
  if (!res.status === 200) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return { data: res.data };
}



function* watchAdminLogin() {
  yield takeLatest(REQUEST_ADMIN_LOGIN, fetchLogin)
}

function* watchFetchUsers() {
  yield takeLatest(REQUEST_FETCH_USER, fetchAllUsers)
}


export default function* authSaga() {
  yield all([
    watchAdminLogin(),
    watchFetchUsers()
  ]);
}

