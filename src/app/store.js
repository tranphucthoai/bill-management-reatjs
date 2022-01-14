import { configureStore } from '@reduxjs/toolkit';
import transferBillReducer from '../features/transferBill/transferBillSlice';
import saleBillReducer from '../features/saleBill/salesBillSlice';
import loginUser from '../features/login/loginSlice';

const rootReducer = {
  transferBill: transferBillReducer,
  saleBill: saleBillReducer,
  loginUser: loginUser,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
