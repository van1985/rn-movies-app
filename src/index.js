import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import myStore from './myStore';
import AppNavigator from './navigator';

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Provider store={myStore}>
    <AppContainer />
  </Provider>
);

export default App;
