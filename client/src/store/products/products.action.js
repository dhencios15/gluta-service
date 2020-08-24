import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_START,
} from '../type.constant';

export const getProductStart = () => ({
  type: GET_PRODUCTS_START,
});

export const getAllProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  payload: products,
});

export const getProductsFailed = (payload) => ({
  type: GET_PRODUCTS_FAILED,
  payload,
});
