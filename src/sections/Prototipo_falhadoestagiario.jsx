import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadError(null); // Clear any previous error message
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setUploadError('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(
        'https://api.imgur.com/3/image',
        formData,
        {
          headers: {
            Authorization: `Client-ID 8087b7d0d68bfab`, // Replace with your actual Imgur Client ID
          },
        }
      );

      setImageUrl(response.data.data.link);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('An error occurred during upload. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </div>
  );
};

export default ImageUpload;