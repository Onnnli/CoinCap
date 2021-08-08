import { combineReducers } from 'redux';
import { appReducer } from './app/appReducer';
import { connectRouter } from 'connected-react-router';
import { walletReducer } from './wallet/walletReducer';

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    appReducer: appReducer,
    wallet: walletReducer,
  });

export default rootReducer;
