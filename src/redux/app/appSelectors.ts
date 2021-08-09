import { createSelector } from 'reselect';

const accessSelectors = (state: { appReducer: any }) => state.appReducer;

export const accessSelector = createSelector(
  accessSelectors,
  item => item.access
);

export const coinSelector = createSelector(accessSelectors, item => item.coin);

export const historyCoinSelector = createSelector(
  accessSelectors,
  item => item.history
);
