import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  modalInfo: {},
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal(state, action) {
      const {
        id,
        title,
        backDropPath,
        overview,
        releaseDate,
        language,
        genresIDs,
      } = action.payload;

      state.modalInfo = {
        id,
        title,
        backDropPath,
        overview,
        releaseDate,
        language,
        genresIDs,
      };

      state.isOpen = true;
    },
    closeModal(state) {
      state.modalInfo = {};
      state.isOpen = false;
    },
  },
});

export default modalSlice;
