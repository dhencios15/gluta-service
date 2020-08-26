import { createSelector } from 'reselect';

const selectClient = (state) => state.clients;

export const selectAllClients = createSelector(
  [selectClient],
  (state) => state.clients
);
