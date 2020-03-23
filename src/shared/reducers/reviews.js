import { REQUEST_FETCH_REVIEWS, SUCCESS_FETCH_REVIEWS, FAIL_FETCH_REVIEWS } from '../actions/review-action';

const initialState = {};

const reviews = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_FETCH_REVIEWS:
      return {
        ...state,
        loading: true
      };
    case SUCCESS_FETCH_REVIEWS:
      return {
        ...state,
        loading: false,
        reviews: action.reviews
      };
    case FAIL_FETCH_REVIEWS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export default reviews;
