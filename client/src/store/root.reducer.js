import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import productReducer from './products/products.reducer';
import clientReducer from './clients/clients.reducer';

const persisConfig = {
  key: 'root',
  storage,
  whitelist: ['products'],
};

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  clients: clientReducer,
});

export default persistReducer(persisConfig, rootReducer);
