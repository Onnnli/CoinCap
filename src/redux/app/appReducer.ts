import { handleActions } from 'redux-actions';

import { appActionTypes } from './appActionTypes';
import { IAccess } from '../../interfaces/access';

interface IInitialState {
  access: IAccess[];
  coin: IAccess;
}

const initialState: IInitialState = {
  access: [],
  coin: {} as IAccess,
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
