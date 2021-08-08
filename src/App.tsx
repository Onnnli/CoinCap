import React, { useEffect } from 'react';

import './styles/App.scss';
import Main from './containers/Main';
import { useDispatch } from 'react-redux';
import { appActions } from './redux/app/appActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.initApp());
  }, []);

  return <Main />;
}

export default App;
