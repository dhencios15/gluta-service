import { createSelector } from 'reselect';

const selectProduct = (state) => state.products;

export const selectAllProduct = createSelector(
  [selectProduct],
  (state) => state.products
);
