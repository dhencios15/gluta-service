import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_FAILED,
  SIGN_IN_START,
} from '../type.constant';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_START:
      return {
        ...state,
        loading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null,
        loading: false,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        loading: false,
      };
    case SIGN_IN_FAILED:
    case SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
