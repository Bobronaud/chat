import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  active: null,
};
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      const channels = action.payload;
      state.channels = channels.length > 1 ? [...state.channels, ...channels] : [...state.channels, channels];
    },
    setActive: (state, action) => {
      const value = action.payload;
      state.active = value;
    },
  },
});

export const { addChannels, setActive } = channelsSlice.actions;

export default channelsSlice.reducer;
