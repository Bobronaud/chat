/* eslint-disable no-param-reassign */
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
      state.channels = [...state.channels, channels].flat();
    },
    renameChannel: (state, action) => {
      const channel = action.payload;
      state.channels.find((e) => e.id === channel.id).name = channel.name;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((e) => e.id !== id);
    },
    setActive: (state, action) => {
      const value = action.payload;
      const defaultChannel = state.channels.find((e) => e.name === 'general');
      state.active = value || defaultChannel.id;
    },
    clearChannels: (state) => {
      state.channels = [];
    },
  },
});

export const {
  addChannels,
  renameChannel,
  removeChannel,
  setActive,
  clearChannels,
} = channelsSlice.actions;

export default channelsSlice.reducer;
