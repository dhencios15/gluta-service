import {
  GET_ALL_CLIENTS,
  GET_ALL_CLIENTS_FAILED,
  GET_CLIENT,
} from '../type.constant';

const INITIAL_STATE = {
  clients: [],
  client: {},
};

const clientReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: payload,
      };
    case GET_CLIENT:
      return {
        ...state,
        client: payload,
      };
    case GET_ALL_CLIENTS_FAILED:
      return state;
    default:
      return state;
  }
};

export default clientReducer;
