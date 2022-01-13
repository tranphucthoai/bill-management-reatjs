import { configureStore } from '@reduxjs/toolkit';
import transfersBillReducer from '../features/transfersBill/transfersBillSlice';
import loginUser from '../features/login/loginSlice';

const rootReducer = {
  transfersBill: transfersBillReducer,
  loginUser: loginUser,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
