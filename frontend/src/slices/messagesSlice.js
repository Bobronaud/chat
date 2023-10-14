import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message } = action.payload;
      state.messages = [message, ...state.messages];
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
