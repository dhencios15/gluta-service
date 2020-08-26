import {
  GET_ALL_CLIENTS_START,
  GET_ALL_CLIENTS,
  GET_ALL_CLIENTS_FAILED,
  GET_CLIENT,
  GET_CLIENT_START,
} from '../type.constant';

export const getAllClientStart = () => ({
  type: GET_ALL_CLIENTS_START,
});

export const getClientStart = () => ({
  type: GET_CLIENT_START,
});

export const getAllClients = (products) => ({
  type: GET_ALL_CLIENTS,
  payload: products,
});

export const getProductsFailed = (payload) => ({
  type: GET_ALL_CLIENTS_FAILED,
  payload,
});

export const getClient = (payload) => ({
  type: GET_CLIENT,
  payload,
});
