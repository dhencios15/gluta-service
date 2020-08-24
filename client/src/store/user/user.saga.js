import { put, call } from 'redux-saga/effects';

import {
  SIGN_IN_START,
  SIGN_OUT_START,
  CHECK_USER_SESSION,
} from '../type.constant';

// import firebase from '../../firebase';

import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
} from './user.action';

import firebase from '../../firebase';

function* getSnapshotFromUserAuth(userAuth, otherData) {
  try {
    const userRef = yield call(
      firebase.createUserProfileDocument,
      userAuth,
      otherData
    );
    if (!userRef) return yield put(signOutSuccess());
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* userSagas({ type, payload }) {
  switch (type) {
    case SIGN_IN_START:
      try {
        const { user } = yield call(
          firebase.signIn,
          payload.email,
          payload.password
        );
        yield getSnapshotFromUserAuth(user);
      } catch (error) {
        yield put(signInFailed('Incorrect Email or Password'));
      }
      break;
    case SIGN_OUT_START:
      try {
        yield call(firebase.signOut);
        yield put(signOutSuccess());
      } catch (error) {
        yield put(signOutFailed());
      }
      break;
    case CHECK_USER_SESSION:
      // yield put(signOutSuccess());
      const userAuth = yield call(firebase.getCurrentUser);
      if (!userAuth) return yield put(signOutSuccess());
      yield getSnapshotFromUserAuth(userAuth);
      break;
    default:
      return;
  }
}

export default userSagas;
