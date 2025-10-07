// ImageUploader.jsx
import React, { useState } from "react";

const ImageUploader = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && <img src={preview} alt="preview" width="100" />}
    </div>
  );
};

export default ImageUploader;
