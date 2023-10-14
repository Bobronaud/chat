import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  active: null,
};
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const { channel } = action.payload;
      state.channels = [channel, ...state.channels];
    },
    setActive: (state, action) => {
      const { value } = action.payload;
      state.active = value;
    },
  },
});

export const { addChannel, setActive } = channelsSlice.actions;

export default channelsSlice.reducer;
