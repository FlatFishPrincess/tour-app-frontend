import axios from 'axios';
import { put, takeLatest, all, call, takeEvery } from 'redux-saga/effects';
import {
  requestReviewSuccess,
  REQUEST_FETCH_REVIEWS,
  SUCCESS_FETCH_REVIEWS,
  FAIL_FETCH_REVIEWS,
  REQUEST_CREATE_REVIEWS,
  SUCCESS_CREATE_REVIEWS,
  FAIL_CREATE_REVIEWS
} from '../actions/review-action';
import { BASE_URL } from '../../shared/utils/server.util';


function* fetchReviews() {
  try{
    const result = yield call(getReviews);
    console.log('fetch review??',result);
    if (!result.data) { throw new Error(); }
    console.log('fetch review? ', result.data);
    yield put(requestReviewSuccess(result.data));
  }catch (error) {
    yield put({ type: FAIL_FETCH_REVIEWS, loading: false });
  }
}

async function getReviews() {
  const FETCH_REVIEW = `${BASE_URL}/get/review`;
  const res = await axios.get(FETCH_REVIEW);
  if (!res.status === 200) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return { data: res.data };
}

function* createReview(action) {
  try{
    console.log('triggere createReivew? acition?', Array.from(action.data.formData));
    const result = yield call(saveReview, action.data.review);
    if (!result.reviewId) { throw new Error(); }
    yield put({ type: SUCCESS_CREATE_REVIEWS, loading: false });
    // yield put({ type:}) TODO: add photo
    const photoResult = yield call(uploadPhotos, result.reviewId, action.data.formData );
    if (!photoResult.data) { throw new Error(); }
    return photoResult.data.data;
  }catch (error) {
    yield put({ type: FAIL_CREATE_REVIEWS, loading: false });
    console.log('error occurs', error);
  }
}

async function uploadPhotos(reviewId, formData){
  const UPLOAD_PHOTO_URL = `${BASE_URL}/create/upload-images/${reviewId}`;
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  };
  
  const res = await axios.post(UPLOAD_PHOTO_URL,formData,config);
  if (!res.status === 200) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return { data: res.data };
}

async function saveReview(data) {
  const CREATE_REVIEW_URL = `${BASE_URL}/create/review`;
  const res =  await axios({
      method: 'post',
      url: CREATE_REVIEW_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
  });
  console.log('save review??',res);
  if (!res.status === 200) {
    const { error } = await res.json();
    throw new Error(error);
  }
  return { reviewId: res.data };
}


function* watchFetchReview() {
  yield takeEvery(REQUEST_FETCH_REVIEWS, fetchReviews);
}


function* watchCreateReview() {
  yield takeEvery(REQUEST_CREATE_REVIEWS, createReview);
}


export default function* reviewSaga() {
  yield all([
    watchFetchReview(),
    watchCreateReview()
  ]);
}

