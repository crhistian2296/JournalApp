import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';
import JournalLayout from '../layout/JournalLayout';
import NoteView from '../views/NoteView';
import NothingSelectedView from '../views/NothingSelectedView';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isSaving = null, active = null } = useSelector(
    state => state.journal
  );

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis illum
        blanditiis nostrum culpa, molestias suscipit reprehenderit. Iste
        consequuntur numquam voluptatibus asperiores unde, obcaecati, excepturi
        labore magni eligendi itaque esse aspernatur!Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Facilis illum blanditiis nostrum culpa,
        molestias suscipit reprehenderit. Iste consequuntur numquam voluptatibus
        asperiores unde, obcaecati, excepturi labore magni eligendi itaque esse
        aspernatur!
      </Typography> */}
      {active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size='large'
        disabled={isSaving}
        onClick={() => onClickNewNote()}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          transition: 'opacity 300ms',
          ':hover': {
            backgroundColor: 'error.main',
            opacity: 0.7,
          },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined />
      </IconButton>
    </JournalLayout>
  );
};

// NothingSelected
// NoteView

export default HomePage;
