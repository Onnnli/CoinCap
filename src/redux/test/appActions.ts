import { push } from 'connected-react-router';

import { TestActionTypes } from './testActionTypes';
import { Dispatch } from 'redux';
import { apiService } from '../../services/apiService';

export const testActions = {
  testAction: () => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch(testActions.testActionSuccess(1));
        dispatch(push('/second'));
      } catch (e) {
        console.log(e);
      }
    };
  },
  testActionSuccess: (number: number) => ({
    payload: number,
    type: TestActionTypes.TEST_ACTION,
  }),
  getAssets: () => {
    return async (dispatch: Dispatch) => {
      try {
        const response = await apiService.getAssets();
        console.log(response.data.data);
      } catch (e) {
        console.warn(e);
      }
    };
  },
  getAccessSuccess: access => ({}),
};
