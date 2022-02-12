import { createSlice } from '@reduxjs/toolkit';

const receivesBillSlice = createSlice({
  name: 'receivesBill',
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

const { actions, reducer } = receivesBillSlice;
export const { edit, create } = actions;
export default reducer;
