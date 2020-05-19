import React from 'react';
import formHeart from '../../../img/form-heart.svg';
import close from '../../../img/close.svg';

import './FormPage.scss';

const FormPage = ({ children, modal, setModal }) => (
  <div className="form-page">
    <div className="logo-block">
      <img src={formHeart} alt="heart" />
    </div>
    <div className="form">
      {children}
      <img
        className="close"
        onClick={() => setModal(!modal)}
        src={close}
        alt="close"
      />
    </div>
  </div>
);

export default FormPage;
