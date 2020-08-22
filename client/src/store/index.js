import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddlewares from 'redux-saga';

import rootReducer from './root.reducer';
import rootSaga from './root.saga';
const sagaMiddleWare = createSagaMiddlewares();

const middlewares = [sagaMiddleWare];

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

sagaMiddleWare.run(rootSaga);
export const persistor = persistStore(store);

export default { store, persistor };
