import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal';

const SideBarItem = ({ id, date, title, body, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const { active } = useSelector(state => state.journal);

  const newTitle = useMemo(() =>
    title?.length > 17 ? title.substring(0, 17) + '...' : title
  );

  const newBody = useMemo(() =>
    body?.length > 40 ? body.substring(0, 40) + '...' : body
  );

  const isActive = () => active?.id === id;
  const activeElement = isActive();

  const onClickItem = () => {
    dispatch(setActiveNote({ id, date, title, body, imageUrls }));
  };

  return (
    <ListItem
      key={id}
      disabled={activeElement}
      disablePadding
      onClick={() => onClickItem()}
    >
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.number,
  body: PropTypes.string,
  title: PropTypes.string,
  imageUrls: PropTypes.array,
};

export default SideBarItem;
