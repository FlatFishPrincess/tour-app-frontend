import axios from 'axios';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { REQUEST_ADMIN_LOGIN, SUCCESS_ADMIN_LOGIN, FAIL_ADMIN_LOGIN } from '../actions';
import { BASE_URL } from '../../shared/utils/server.util';

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

function* watchAdminLogin() {
  yield takeLatest(REQUEST_ADMIN_LOGIN, fetchLogin)
}

export default function* authSaga() {
  yield all([
    watchAdminLogin()
  ]);
}

