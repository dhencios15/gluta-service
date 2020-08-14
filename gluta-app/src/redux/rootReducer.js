import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';

const persisConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ user: userReducer });

export default persistReducer(persisConfig, rootReducer);
