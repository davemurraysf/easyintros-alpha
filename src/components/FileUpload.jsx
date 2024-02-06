import React from "react";

const FileUpload = ({ handleFileUpload }) => {
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleInputChange} />
    </div>
  );
};

export default FileUpload;
