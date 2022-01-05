import { createSlice } from '@reduxjs/toolkit';

const transfersBillSlice = createSlice({
  name: 'transfersBill',
  initialState: false,
  reducers: {
    edit(state) {
      return true;
    },
    create(state) {
      return false;
    },
  },
});

const { actions, reducer } = transfersBillSlice;
export const { edit, create } = actions;
export default reducer;
