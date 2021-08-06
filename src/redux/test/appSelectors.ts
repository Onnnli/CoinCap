import { createSelector } from 'reselect';

const accessSelectors = (state: { appReducer: any }) => state.appReducer;

export const accessSelector = createSelector(
  accessSelectors,
  item => item.access
);
