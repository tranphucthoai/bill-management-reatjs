import { configureStore } from '@reduxjs/toolkit';
import transferBillReducer from '../features/transferBill/transferBillSlice';
import saleBillReducer from '../features/saleBill/salesBillSlice';
import collectionBillReducer from '../features/collectionBill/collectionBillSlice';
import receiveBillReducer from '../features/receiveBill/receiveBillSlice';
import loginUser from '../features/login/loginSlice';
import menuMobileReducer from '../components/MenuMobile/menuMoblieSlice';

const rootReducer = {
  transferBill: transferBillReducer,
  saleBill: saleBillReducer,
  collectionBill: collectionBillReducer,
  receiveBill: receiveBillReducer,
  loginUser: loginUser,
  menuMobile: menuMobileReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
