import { v2 as cloudinary } from 'cloudinary';
import { describe, expect, test } from 'vitest';
import { fileUpload } from '../../src/store/journal/helpers';

cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUDINARY_BUCKET_NAME,
  api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  secure: true,
});

describe('Tests para fileUpload', () => {
  test('Debe de subir el archivo correctamente a cloudinary', async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1585020430145-2a6b034f7729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D';

    // Crear archivo
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'test-foto.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Destruirt archivo
    const urlSegments = url.split('/');
    const imageId = urlSegments.at(-1).replace('.jpg', '');

    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image',
    });
  });

  test('Debe de retornar null', async () => {
    const file = new File([null], 'test-foto.jpg');

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
