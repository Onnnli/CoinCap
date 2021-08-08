import { handleActions } from 'redux-actions';
import { walletActionTypes } from './walletActionTypes';

interface IInitialState {
  walletInfo: IWalletInfo;
  wallet: number;
  difference: number;
  differencePercent: number;
}

interface IWalletInfo {
  [K: string]: string | number;
}

const initialState: IInitialState = {
  walletInfo: {},
  wallet: 0,
  difference: 0,
  differencePercent: 0,
};

// @ts-ignore
export const walletReducer = handleActions(
  {
    [walletActionTypes.INIT_BAG_VALUE]: (state, action) => {
      return {
        ...state,
        wallet: action.payload,
      };
    },
    [walletActionTypes.INIT_BAG_INFO]: (state, action) => {
      return {
        ...state,
        walletInfo: action.payload,
      };
    },
    [walletActionTypes.ADD_TO_WALLET]: (state, action) => {
      return {
        ...state,
        wallet: action.payload.wallet,
        difference: action.payload.difference,
        differencePercent: action.payload.differencePercent,
      };
    },
    [walletActionTypes.WALLET_INFO]: (state, action) => {
      return {
        ...state,
        walletInfo: action.payload,
      };
    },
    [walletActionTypes.DELETE]: (state, action) => {
      return {
        ...state,
        walletInfo: action.payload,
      };
    },
  },
  initialState
);
