/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: null,
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.modal = action.payload;
    },
    modalClose: (state, action) => {
      state.modal = null;
    },
  },
});

export const { modalOpen, modalClose } = uiSlice.actions;

export default uiSlice.reducer;
