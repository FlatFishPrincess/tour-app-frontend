export const REQUEST_FETCH_REVIEWS = 'REQUEST_FETCH_REVIEWS'
export const SUCCESS_FETCH_REVIEWS = 'SUCCESS_FETCH_REVIEWS'
export const FAIL_FETCH_REVIEWS = 'FAIL_FETCH_REVIEWS'

export const REQUEST_CREATE_REVIEWS = 'REQUEST_CREATE_REVIEWS';
export const SUCCESS_CREATE_REVIEWS =  'SUCCESS_CREATE_REVIEWS';
export const FAIL_CREATE_REVIEWS =  'FAIL_CREATE_REVIEWS';

export const getReviews = () => {
  return { type: REQUEST_FETCH_REVIEWS }
}

export const requestReviewSuccess = (reviews) => {
  return { type: SUCCESS_FETCH_REVIEWS, reviews }
}

export function createReview(review, formData){
  return { type: REQUEST_CREATE_REVIEWS, data: { review, formData } }
}
