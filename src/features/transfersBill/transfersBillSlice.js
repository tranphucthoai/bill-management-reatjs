import { createSlice } from '@reduxjs/toolkit';

const transfersBillSlice = createSlice({
  name: 'transfersBill',
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

const { actions, reducer } = transfersBillSlice;
export const { edit, create } = actions;
export default reducer;
