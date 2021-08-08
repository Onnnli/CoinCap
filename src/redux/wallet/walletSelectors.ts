import { createSelector } from 'reselect';

const bagSelectors = (state: { wallet: any }) => state.wallet;

export const walletSelect = createSelector(bagSelectors, item => item.wallet);

export const differenceSelect = createSelector(
  bagSelectors,
  item => item.difference || 0
);

export const differencePercentSelect = createSelector(
  bagSelectors,
  item => item.differencePercent || 0
);

export const walletInfoSelect = createSelector(
  bagSelectors,
  item => item.walletInfo
);
