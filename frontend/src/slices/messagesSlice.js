/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  messages: [],
};
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      const messages = action.payload;
      if (messages.length === 0) {
        return;
      }
      state.messages = [...state.messages, messages].flat();
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages.filter((e) => e.channelId !== id);
    });
  },
});

export const { addMessages, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
