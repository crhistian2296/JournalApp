export const fileUpload = async file => {
  if (!file) throw new Error('There is no file to upload');
  const cloudUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_BUCKET_NAME}/upload`;
  const formData = new FormData();

  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, { method: 'POST', body: formData });

    if (!resp.ok) throw new Error('It was not possible to upload the image');

    const cloudResponse = await resp.json();
    return cloudResponse.secure_url;
  } catch (error) {
    console.debug(error);
    return null;
    // throw new Error(error.message);
  }
};
