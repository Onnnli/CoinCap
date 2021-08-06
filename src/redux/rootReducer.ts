import { combineReducers } from 'redux';
import { appReducer } from './test/appReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    appReducer: appReducer,
  });

export default rootReducer;
