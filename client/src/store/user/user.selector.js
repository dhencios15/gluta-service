import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserSigningIn = createSelector(
  [selectUser],
  (user) => user.loading
);

export const selectUserHasError = createSelector(
  [selectUser],
  (user) => user.error
);
