import { put, call } from 'redux-saga/effects';

import firebase from '../../firebase';
import { GET_PRODUCTS_START } from '../type.constant';
import { getAllProducts, getProductsFailed } from './products.action';

function* productSaga({ type, payload }) {
  switch (type) {
    case GET_PRODUCTS_START:
      try {
        const products = yield call(firebase.getProducts);
        yield put(getAllProducts(products));
      } catch (error) {
        yield put(getProductsFailed());
      }
      break;
    default:
      return;
  }
}

export default productSaga;
