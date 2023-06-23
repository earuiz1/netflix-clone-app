import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  modalInfo: {},
  genres: {},
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal(state, action) {
      state.modalInfo = action.payload;
      state.isOpen = true;
    },

    setGenres(state, action) {
      state.genres = action.payload;
    },

    closeModal(state) {
      state.modalInfo = {};
      state.isOpen = false;
    },
  },
});

export default modalSlice;
