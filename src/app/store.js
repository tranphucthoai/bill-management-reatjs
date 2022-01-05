import { configureStore } from '@reduxjs/toolkit';
import transfersBillReducer from '../features/transfersBill/transfersBillSlice';

const rootReducer = {
  transfersBill: transfersBillReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
