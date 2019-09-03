import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './navigator';
import myStore from './myStore';

const App = () => (
  <Provider store={myStore}>
    <Navigator />
  </Provider>
);

export default App;
