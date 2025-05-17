import React, { useRef, useState } from "react";

export default function CustomFileInput({ onFileChange }) {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleClick = () => inputRef.current.click();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleChangeFile = () => {
    setSelectedFile(null);
    inputRef.current.value = '';
    onFileChange(null);
  };

  return (
    <div
      className="custom-file-input"
      onClick={!selectedFile ? handleClick : undefined}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      {!selectedFile ? (
        <>
          <div style={{ fontSize: "2rem", color: "#888" }}>↑</div>
          <div style={{ fontSize: "1.3rem", margin: "10px 0" }}>
            Seret dan Lepas atau <span style={{ color: "#3674B5", fontWeight: 700 }}>Pilih File</span> untuk diunggah.
          </div>
          <div style={{ color: "#888" }}>File rekaman harus dengan format .edf.</div>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: "1.1rem", margin: "10px 0", wordBreak: 'break-all' }}>
            {selectedFile.name}
          </div>
          <button 
            onClick={handleChangeFile}
            style={{
              background: 'none',
              border: 'none',
              color: '#3674B5',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: '5px 10px'
            }}
          >
            GANTI FILE
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".edf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}