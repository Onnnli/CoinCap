import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import App from './App';
import { configureStore, history } from './redux/configureStore';
import CoinInfo from './containers/CoinInfo';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

export const store = configureStore(history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            exact
            path="/:id"
            component={(props: any) => <CoinInfo {...props} />}
          />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
