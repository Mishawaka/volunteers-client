import React, { createContext, useState } from 'react';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState();
  return (
    <RegisterContext.Provider
      value={{
        email,
        setEmail,
        image,
        setImage,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
