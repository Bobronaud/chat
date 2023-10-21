import { createSlice } from '@reduxjs/toolkit';

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
      state.messages =
        messages.length > 1 ? [...state.messages, ...messages] : [...state.messages, messages];
    },
  },
});

export const { addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
