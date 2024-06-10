import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { beforeEach, describe, expect, test, vitest } from 'vitest';
import { FirebaseDB } from '../../../src/firebase/config';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  startLoadingNotes,
  startNewNote,
} from '../../../src/store/journal';
import { loadNotes } from '../../../src/store/journal/helpers';
vitest.mock('../../../src/store/journal/helpers/loadNotes.js');

describe('Pruebas en journal thunks', () => {
  const dispatch = vitest.fn();
  const getState = vitest.fn();
  const uid = 'TEST-UID';
  beforeEach(() => vitest.clearAllMocks());

  test('startNewNote debe de crear una nueva nota vacia', async () => {
    getState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        title: '',
        body: '',
        date: expect.any(Number),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        title: '',
        body: '',
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: [],
      })
    );
    // Borrar de firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const { docs } = await getDocs(collectionRef);
    await Promise.all(docs.map(({ ref }) => deleteDoc(ref)));
  });

  test('startLoadingNotes debe de cargar todas las notas del usuario', async () => {
    const notes = [
      {
        title: '',
        body: '',
        date: new Date().getTime(),
        imageUrls: [],
      },
    ];

    getState.mockReturnValue({ auth: { uid } });
    await loadNotes.mockReturnValue(notes);
    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setNotes(notes));
  });
});
