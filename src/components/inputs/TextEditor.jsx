import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill's CSS

const TextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (content) => {
    setText(content);
  };

  return (
    <ReactQuill value={text} onChange={handleChange} />
  );
};

export default TextEditor;