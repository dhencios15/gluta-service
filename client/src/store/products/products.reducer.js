import { GET_ALL_PRODUCTS, GET_PRODUCTS_FAILED } from '../type.constant';

const INITIAL_STATE = {
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case GET_PRODUCTS_FAILED:
      return state;
    default:
      return state;
  }
};

export default productReducer;
