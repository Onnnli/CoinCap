import { push } from 'connected-react-router';

import { AppActionTypes } from './appActionTypes';
import { Dispatch } from 'redux';
import { apiService } from '../../services/apiService';

interface IAccess {
  [k: string]: string | number;
}

export const appActions = {
  getAssets: (limit: number) => {
    return async (dispatch: Dispatch) => {
      try {
        const response = await apiService.getAssets(limit);
        dispatch(appActions.getAccessSuccess(response.data.data));
      } catch (e) {
        console.warn(e);
      }
    };
  },
  getAccessSuccess: (access: IAccess) => ({
    payload: access,
    type: AppActionTypes.GET_ACCESS,
  }),
};
