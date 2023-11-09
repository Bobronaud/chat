/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    type: null,
    channel: null,
  },
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModal: (state, action) => {
      const { type, channel } = action.payload;
      state.modal.type = type;
      state.modal.channel = channel;
    },
  },
});

export const { setModal } = uiSlice.actions;

export default uiSlice.reducer;
