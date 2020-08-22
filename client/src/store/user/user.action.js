import {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED,
  CHECK_USER_SESSION,
} from '../type.constant';

export const signInStart = (emailAndPassword) => ({
  type: SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailed = (err) => ({
  type: SIGN_IN_FAILED,
  payload: err,
});

export const signOutStart = () => ({
  type: SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOutFailed = (err) => ({
  type: SIGN_OUT_FAILED,
  payload: err,
});

export const checkUserSession = () => ({
  type: CHECK_USER_SESSION,
});
