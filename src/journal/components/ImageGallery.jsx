import { ImageList, ImageListItem } from '@mui/material';
import PropTypes from 'prop-types';

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
