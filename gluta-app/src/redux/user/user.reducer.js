import { USER_LOGIN } from '../../helpers/types.contant';

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
