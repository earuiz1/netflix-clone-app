import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Modal {
  id: number;
  title: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}
interface ModalState {
  modal: Modal;
  genres: Genre[];
  isOpen: boolean;
}

const initialModalState: ModalState = {
  modal: {
    id: 0,
    title: "",
    backdrop_path: "",
    release_date: "",
    overview: "",
    genre_ids: [],
  },
  genres: [],
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<Modal>) => {
      state.modal = action.payload;
      state.isOpen = true;
    },

    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },

    closeModal: (state) => {
      state.modal = {
        id: 0,
        title: "",
        backdrop_path: "",
        release_date: "",
        overview: "",
        genre_ids: [],
      };
      state.isOpen = false;
    },
  },
});

export default modalSlice;
export const { openModal, setGenres, closeModal } = modalSlice.actions;
