import { handleActions } from 'redux-actions';

import { appActionTypes } from './appActionTypes';
import { IAssets } from '../../interfaces/assets';

interface IInitialState {
  access: IAssets[];
  coin: IAssets;
}

const initialState: IInitialState = {
  access: [],
  coin: {} as IAssets,
};

// @ts-ignore
export const appReducer = handleActions(
  {
    [appActionTypes.GET_ACCESS]: (state, action) => {
      return {
        ...state,
        access: action.payload,
      };
    },
    [appActionTypes.GET_COIN_INFO]: (state, action) => {
      return {
        ...state,
        coin: action.payload,
      };
    },
    [appActionTypes.GET_COIN_HISTORY]: (state, action) => {
      return {
        ...state,
        history: action.payload,
      };
    },
  },
  initialState
);
