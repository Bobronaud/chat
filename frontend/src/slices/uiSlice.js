import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: null,
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModal: (state, action) => {
      const value = action.payload;
      state.modal = value;
    },
  },
});

export const { setModal } = uiSlice.actions;

export default uiSlice.reducer;
