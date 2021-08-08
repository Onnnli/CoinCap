import { push } from 'connected-react-router';
import moment from 'moment';

import { Dispatch } from 'redux';

import { appActionTypes } from './appActionTypes';
import { apiService } from '../../services/apiService';
import { walletActions } from '../wallet/walletActions';
import { IAssets } from '../../Interfaces/assets';

interface IHistory {
  name: string;
  uv: number;
}

interface IHistoryResponse {
  priceUsd: string;
  time: number;
  date: string;
}

export const appActions = {
  initApp: () => {
    return (dispatch: Dispatch) => {
      try {
        const wallet = localStorage.getItem('wallet');
        const walletInfo = localStorage.getItem('walletInfo');

        if (!wallet) {
          localStorage.setItem('wallet', '0');
        }
        if (!walletInfo) {
          localStorage.setItem('walletInfo', '{}');
        }
        dispatch(walletActions.setBagValue(Number(wallet)));
        dispatch(walletActions.setBagInfo(JSON.parse(walletInfo!)));
      } catch (e) {
        console.warn(e);
      }
    };
  },
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
  getAccessSuccess: (access: IAssets) => ({
    payload: access,
    type: appActionTypes.GET_ACCESS,
  }),
  getCoinInfo: (id: string) => {
    return async (dispatch: Dispatch) => {
      try {
        const response = await apiService.getCryptoInfo(id);
        dispatch(appActions.getCoinInfoSuccess(response.data.data));
        dispatch(push(`/${id}`));
      } catch (e) {
        console.warn(e);
      }
    };
  },
  getCoinInfoSuccess: (info: IAssets) => ({
    payload: info,
    type: appActionTypes.GET_COIN_INFO,
  }),
  getHistoryCoin: (id: string, interval: string) => {
    return async (dispatch: Dispatch) => {
      try {
        const response = await apiService.getCoinHistory(id, interval);

        if (response) {
          const data = response?.data?.data?.map(
            (history: IHistoryResponse) => {
              let name = moment(history.time).format('YYYY-MM-DD HH:mm:ss');

              return {
                name,
                uv: parseFloat(Number(history.priceUsd).toFixed(2)),
              };
            }
          );
          dispatch(appActions.getHistoryCoinSuccess(data));
        }
      } catch (e) {
        console.warn(e);
      }
    };
  },
  getHistoryCoinSuccess: (history: IHistory[]) => ({
    payload: history,
    type: appActionTypes.GET_COIN_HISTORY,
  }),
};
