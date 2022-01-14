import { createSlice } from '@reduxjs/toolkit';

const salesBillSlice = createSlice({
  name: 'salesBill',
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

const { actions, reducer } = salesBillSlice;
export const { edit, create } = actions;
export default reducer;
