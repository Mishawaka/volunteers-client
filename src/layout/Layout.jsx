import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const withLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
