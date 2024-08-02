import { ImageListItem } from '@mui/material';
import PropTypes from 'prop-types';

const isValidImageFormat = fileName => {
  const regex = /\.(jpg|jpeg|png|gif|bmp|ico|tiff|apng|avif|svg|webp)$/i;

  return regex.test(fileName);
};

const isValidVideoFormat = fileName => {
  const regex = /\.(mp4|webm|ogg|avi|mov|flv|mkv|wmv)$/i;

  return regex.test(fileName);
};

const CheckFileType = ({ fileName }) => {
  if (isValidImageFormat(fileName)) {
    return (
      <ImageListItem key={fileName}>
        <img
          srcSet={`${fileName}`}
          src={`${fileName}`}
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
    );
  } else if (isValidVideoFormat(fileName)) {
    return (
      <ImageListItem key={fileName}>
        <video
          srcSet={`${fileName}`}
          src={`${fileName}`}
          alt='imagen de la nota'
          controls
          style={{
            display: 'block',
            objectFit: 'contain',
            overflow: 'hidden',
            margin: '0 auto',
            height: '100%',
            width: '100%',
          }}
        />
      </ImageListItem>
    );
  }
  return null;
};

CheckFileType.propTypes = {
  fileName: PropTypes.string.isRequired,
};

export default CheckFileType;
