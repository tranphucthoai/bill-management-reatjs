import { createSlice } from '@reduxjs/toolkit';

const transferBillSlice = createSlice({
  name: 'transferBill',
  initialState: {
    isUpdate: false,
    idItem: '',
  },
  reducers: {
    edit(state, action) {
      return {
        isUpdate: true,
        idItem: action.payload,
      };
    },
    create(state, action) {
      return {
        isUpdate: false,
        idItem: '',
      };
    },
  },
});

const { actions, reducer } = transferBillSlice;
export const { edit, create } = actions;
export default reducer;
