import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [src, setSrc] = useState(null);
  const [show, setShow] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState();
  const [file, setFile] = useState({
    name: '',
  });
  return (
    <ImageContext.Provider
      value={{
        src,
        setSrc,
        croppedImageUrl,
        setCroppedImageUrl,
        show,
        setShow,
        file,
        setFile,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
