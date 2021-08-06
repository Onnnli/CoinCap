import { combineReducers } from 'redux';
import { testReducer } from './test/testReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    test: testReducer,
  });

export default rootReducer;
