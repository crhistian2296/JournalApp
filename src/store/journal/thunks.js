import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from './';
import { fileUpload, loadNotes } from './helpers';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    await dispatch(savingNewNote());

    const { uid } = getState().auth;

    console.debug('start new note');
    const newNoteData = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNoteData);

    const newNote = {
      ...newNoteData,
      id: newDoc._key.path.segments.at(3),
    };

    await dispatch(addNewEmptyNote(newNoteData));
    await dispatch(startLoadingNotes(uid));
    await dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) return new Error('uid does not exist');
    const notes = await loadNotes(uid);
    // console.debug(notes);

    await dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const results = await Promise.all([...files].map(fileUpload));

    dispatch(setPhotosToActiveNote(results));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    dispatch(deleteNoteById(note.id));

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
  };
};
