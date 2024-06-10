import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import {
  setActiveNote,
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from '../../store/journal';
import ImageGallery from '../components/ImageGallery';

const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector(state => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  });

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0)
      Swal.fire('Nota actualizada', messageSaved, 'success');
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files.length < 1) return;

    console.debug('Subiendo archivos');

    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    const noteTitle = note.title;
    dispatch(startDeletingNote());
    Swal.fire('Nota eliminada', `"${noteTitle} ha sido eliminada"`, 'success');
  };

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      marginBottom={1}
      alignItems='center'
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography variant='h5'>{dateString}</Typography>
      </Grid>
      <Grid item mb={1}>
        <input
          type='file'
          multiple
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onFileInputChange}
        />
        <Button
          disabled={isSaving}
          sx={{ minWidth: 'fit-content' }}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined sx={{ fontSize: 26 }}></UploadOutlined>
        </Button>
        <Button disabled={isSaving} onClick={onSaveNote}>
          <SaveOutlined sx={{ mr: 1, fontSize: 26 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Enter a title'
          label='Title'
          name='title'
          value={title}
          onChange={onInputChange}
          sx={{ border: 'none', mb: 1 }}
        />
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='How was your day?'
          sx={{ border: 'none', mb: 1 }}
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent='end'>
        <Button onClick={onDelete} color='error' sx={{ mt: 2 }}>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      {note.imageUrl ?? <ImageGallery images={note.imageUrls} />}
    </Grid>
  );
};

export default NoteView;
