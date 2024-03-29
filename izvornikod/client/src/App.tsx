import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import appRouter from './screens/Router';
import store from './redux/store';
import configureAxios from './services/api/axios';

function App() {
  configureAxios();

  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
