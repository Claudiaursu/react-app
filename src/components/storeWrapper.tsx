import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Ideas from '../screens/Ideas';

const StoreWrapper = () => {
  return (
    <Provider store={store}>
      <Ideas />
    </Provider>
  );
};

export default StoreWrapper;
