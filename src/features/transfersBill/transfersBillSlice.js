import { createSlice } from '@reduxjs/toolkit';

const transfersBillSlice = createSlice({
  name: 'actionTransfersBill',
  initialState: {
    statusAction: false,
  },
  reducers: {
    update(state) {
      state.statusAction = true;
    },
    create(state) {
      state.showMiniCart = false;
    },
  },
});

const { actions, reducer } = transfersBillSlice;
export const { update, create } = actions;
export default reducer;
