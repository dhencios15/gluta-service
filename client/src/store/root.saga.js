import { takeLatest } from 'redux-saga/effects';

import * as ACTION from './type.constant';
import userSagas from './user/user.saga';
import productSaga from './products/products.saga';
import clientSaga from './clients/clients.saga';

export default function* rootSaga() {
  yield takeLatest(
    [ACTION.SIGN_IN_START, ACTION.SIGN_OUT_START, ACTION.CHECK_USER_SESSION],
    userSagas
  );
  yield takeLatest([ACTION.GET_PRODUCTS_START], productSaga);
  yield takeLatest(
    [ACTION.GET_ALL_CLIENTS_START, ACTION.GET_CLIENT_START],
    clientSaga
  );
}

// export default function* rootSaga() {
//   yield all([call(userSagas)]);
// }
