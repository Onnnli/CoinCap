import { handleActions } from 'redux-actions';

import { AppActionTypes } from './appActionTypes';

interface IInitialState {
  [K: string]: string | number;
}

const initialState = {};

// @ts-ignore
export const appReducer = handleActions(
  {
    [AppActionTypes.GET_ACCESS]: (
      state: IInitialState,
      action: { payload: IInitialState }
    ) => {
      return {
        ...state,
        access: action.payload,
      };
    },
  },
  initialState
);
