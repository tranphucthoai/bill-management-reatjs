import { configureStore } from '@reduxjs/toolkit';
import actionTransfersBill from '../features/transfersBill/transfersBillSlice';

const rootReducer = {
  counter: actionTransfersBill,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
