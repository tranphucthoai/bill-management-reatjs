import { createSlice } from '@reduxjs/toolkit';

const collectionBillSlice = createSlice({
  name: 'collectionBill',
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

const { actions, reducer } = collectionBillSlice;
export const { edit, create } = actions;
export default reducer;
