import { Dispatch } from 'redux';

import { walletActionTypes } from './walletActionTypes';
import { getDifferencePercent } from '../../utils/differencePercent';
import { store } from '../../index';
import { IBagInfo } from '../../Interfaces/bag';

export const walletActions = {
  setBagValue: (value: number) => ({
    payload: value,
    type: walletActionTypes.INIT_BAG_VALUE,
  }),
  setBagInfo: (value: IBagInfo | null) => ({
    payload: value,
    type: walletActionTypes.INIT_BAG_INFO,
  }),

  addWallet: (price: any) => {
    return (dispatch: Dispatch) => {
      try {
        const state = store.getState();
        const wallet = state.wallet.wallet;
        const totalBudget = Number(wallet) + price;
        const differencePercent = getDifferencePercent(wallet, totalBudget);
        localStorage.setItem('wallet', JSON.stringify(totalBudget));
        dispatch(
          walletActions.addToWallet(totalBudget, price, differencePercent)
        );
      } catch (e) {
        console.warn(e);
      }
    };
  },
  addToWallet: (
    wallet: number,
    difference: number,
    differencePercent: number
  ) => ({
    payload: { wallet, difference, differencePercent },
    type: walletActionTypes.ADD_TO_WALLET,
  }),

  addWalletInfo: (elem: any, amount: number) => {
    return (dispatch: Dispatch) => {
      try {
        const newValue = {
          id: elem.id,
          name: elem.name,
          price: Number(elem.priceUsd),
          amount: amount,
        };

        const walletInfoStorage = localStorage.getItem('walletInfo');

        let walletValue;
        if (typeof walletInfoStorage === 'string') {
          walletValue = JSON.parse(walletInfoStorage);
        }
        const findWalletValueId = walletValue[newValue.id];

        let data;
        if (findWalletValueId) {
          data = {
            ...walletValue,
            [findWalletValueId.id]: {
              ...findWalletValueId,
              amount: findWalletValueId.amount + newValue.amount,
            },
          };
        } else {
          data = { ...walletValue, [newValue.id]: { ...newValue } };
        }

        let newWalletInfo = JSON.stringify(data);

        localStorage.setItem('walletInfo', newWalletInfo);

        dispatch(walletActions.walletInfo(data));
      } catch (e) {
        console.warn(e);
      }
    };
  },

  walletInfo: (data: any) => ({
    payload: data,
    type: walletActionTypes.WALLET_INFO,
  }),

  deleteRequest: (value: any) => {
    return (dispatch: any) => {
      try {
        const state = store.getState();
        const walletInfo = state.wallet.walletInfo;
        const newWallet = Object.values(walletInfo).filter(
          (elem: any) => elem.id !== value.id
        );
        const price = Number(value.price) * Number(value.amount) * -1;
        dispatch(walletActions.delete(newWallet));
        dispatch(walletActions.addWallet(price));
      } catch (e) {
        console.warn(e);
      }
    };
  },

  delete: (value: any) => ({
    payload: value,
    type: walletActionTypes.DELETE,
  }),
};
