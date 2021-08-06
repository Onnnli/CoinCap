import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import rootReducer from './rootReducer';

export const history = createBrowserHistory();

export const configureStore = (history, initState) =>
  createStore(
    rootReducer(history),
    initState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );
