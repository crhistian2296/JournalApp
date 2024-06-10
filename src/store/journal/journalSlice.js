import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
  // active: {
  //   id: 'IABC1231',
  //   title: '',
  //   date: 1234567,
  //   imageUrls: [
  //   https://foto1.jpg,
  //   https://foto2.jpg,
  //   ],
  // },
};

export const journalSlice = createSlice({
  name: 'journalSlice',
  initialState,
  reducers: {
    savingNewNote: state => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: state => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    setPhotosToActiveNote: (state, action) => {
      state.isSaving = false;
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map(note =>
        note.id === action.payload.id ? action.payload : note
      );
      state.messageSaved = `"${action.payload.title}", ha sido actualizada`;
    },
    clearNotesLogout: state => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.isSaving = false;
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
