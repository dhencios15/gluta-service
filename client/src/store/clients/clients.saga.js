import { put, call } from 'redux-saga/effects';

import firebase from '../../firebase';
import { GET_ALL_CLIENTS_START, GET_CLIENT_START } from '../type.constant';
import { getAllClients, getProductsFailed, getClient } from './clients.action';

function* clientSaga({ type, payload }) {
  switch (type) {
    case GET_ALL_CLIENTS_START:
      try {
        const clients = yield call(firebase.getAllClients);
        console.log(clients);
        yield put(getAllClients(clients));
      } catch (error) {
        yield put(getProductsFailed());
      }
      break;
    case GET_CLIENT_START:
      try {
        const client = yield call(firebase.getClient(payload));
        yield put(getClient(client));
      } catch (error) {
        yield put(getProductsFailed());
      }
      break;
    default:
      return;
  }
}

export default clientSaga;
