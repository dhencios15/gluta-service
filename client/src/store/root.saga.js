import { takeLatest } from 'redux-saga/effects';

import * as ACTION from './type.constant';
import userSagas from './user/user.saga';
import productSaga from './products/products.saga';

export default function* rootSaga() {
  yield takeLatest(
    [ACTION.SIGN_IN_START, ACTION.SIGN_OUT_START, ACTION.CHECK_USER_SESSION],
    userSagas
  );
  yield takeLatest([ACTION.GET_PRODUCTS_START], productSaga);
}

// export default function* rootSaga() {
//   yield all([call(userSagas)]);
// }
