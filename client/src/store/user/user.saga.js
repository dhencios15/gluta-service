import { put, takeLatest, all, call } from 'redux-saga/effects';

import {
  SIGN_IN_START,
  SIGN_OUT_START,
  CHECK_USER_SESSION,
} from '../type.constant';

import {
  createUserProfileDocument,
  auth,
  getCurrentUser,
} from '../../firebase';

import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
} from './user.action';

export function* getSnapshotFromUserAuth(userAuth, otherData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, otherData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  const userAuth = yield getCurrentUser();
  if (!userAuth) return;
  yield getSnapshotFromUserAuth(userAuth);
}

export function* signIn({ payload: { email, password } }) {
  const { user } = yield auth.signInWithEmailAndPassword(email, password);
  yield getSnapshotFromUserAuth(user);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed());
  }
}

// * ----------- CALLER FUNCTIONS ------------------- * //

export function* onSignInStart() {
  yield takeLatest(SIGN_IN_START, signIn);
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut);
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignOutStart),
    call(onCheckUserSession),
  ]);
}
