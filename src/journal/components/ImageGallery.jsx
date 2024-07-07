import { ImageList, ImageListItem } from '@mui/material';
import PropTypes from 'prop-types';

const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList
      variant='masonry'
      sx={{
        width: '100%',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr) !important',
          sm: 'repeat(2, 1fr) !important',
          md: 'repeat(3, 1fr) !important',
          lg: 'repeat(4, 1fr) !important',
          xl: 'repeat(5, 1fr) !important',
        },
      }}
    >
      {images.map(url => (
        <ImageListItem key={url}>
          <img
            srcSet={`${url}`}
            src={`${url}`}
            alt='imagen de la nota'
            loading='lazy'
            style={{
              display: 'block',
              objectFit: 'contain',
              overflow: 'hidden',
              margin: '0 auto',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
