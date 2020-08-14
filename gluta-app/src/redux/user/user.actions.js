import { USER_LOGIN } from '../../helpers/types.contant';

export const signIn = (user) => (dispatch) =>
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
