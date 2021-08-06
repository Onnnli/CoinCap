import { handleActions } from 'redux-actions';

import { TestActionTypes } from './testActionTypes';

interface IInitialState {
  number?: number;
}

const initialState = null;

// @ts-ignore
export const testReducer = handleActions(
  {
    [TestActionTypes.TEST_ACTION]: (
      state: IInitialState,
      action: { payload: number }
    ) => {
      return {
        ...state,
        number: action.payload,
      };
    },
  },
  initialState
);
