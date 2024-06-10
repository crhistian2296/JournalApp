import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';

export const loadNotes = async (uid = '') => {
  const notes = [];

  if (!uid) return new Error('uid does not exist');

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const { docs } = await getDocs(collectionRef);

  for (const doc of docs) {
    notes.push({ id: doc.id, ...doc.data() });
  }

  return notes;
};
