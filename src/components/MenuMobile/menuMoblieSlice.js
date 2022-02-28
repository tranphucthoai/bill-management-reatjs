import { createSlice } from '@reduxjs/toolkit';

const menuMobileSlice = createSlice({
  name: 'menuMobile',
  initialState: {
    isShow: false,
  },
  reducers: {
    show(state, action) {
      return {
        isShow: true,
      };
    },
    hide(state, action) {
      return {
        isShow: false,
      };
    },
  },
});

const { actions, reducer } = menuMobileSlice;
export const { show, hide } = actions;
export default reducer;
