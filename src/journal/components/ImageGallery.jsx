import { ImageList } from '@mui/material';
import PropTypes from 'prop-types';
import CheckFileType from './CheckFileType';

const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList
      variant='masonry'
      cols={0}
      gap={8}
      sx={{
        width: '100%',
        columnCount: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        },
      }}
    >
      {images.map(url => (
        <CheckFileType fileName={url} key={url} />
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
