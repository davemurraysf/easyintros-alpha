// store.js
import { configureStore } from '@reduxjs/toolkit';
import selectedRowsReducer from './selectedRowsSlice';

const store = configureStore({
  reducer: {
    // other reducers...
    selectedRows: selectedRowsReducer,
  },
});

export default store;

