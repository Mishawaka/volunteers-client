import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { Context } from '../../contexts/Context';
import ProjectForm from '../forms/ProjectForm/ProjectForm';
import ProjectImages from '../forms/ProjectImages/ProjectImages';

import './Footer.scss';
import footer_logo from '../../img/LogoFooter.svg';
import facebook_img from '../../img/facebook.svg';
import insta_img from '../../img/instagram.svg';
import email_img from '../../img/email.svg';

const Footer = () => {
  const {
    setRegisterModal,
    setProjectModal,
    imagesModal,
    setImagesModal,
    projectModal,
    auth,
    setAuth,
  } = useContext(Context);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ROOT}/checkToken`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ token: localStorage.getItem('jwt') }),
    })
      .then((res) => (res.status === 200 ? setAuth(true) : setAuth(false)))
      .catch((err) => console.log(err));
  }, [auth]);

  return (
    <div className="footer">
      <Modal
        classNames={{ modal: 'modal-class' }}
        open={projectModal}
        onClose={() => setProjectModal(false)}
        center
      >
        <ProjectForm modal={projectModal} setModal={setProjectModal} />
      </Modal>
      <Modal
        classNames={{ modal: 'modal-class' }}
        open={imagesModal}
        onClose={() => setImagesModal(false)}
        center
      >
        <ProjectImages modal={imagesModal} setModal={setImagesModal} />
      </Modal>
      <div className="footer-logo-block">
        <img src={footer_logo} alt="" />
        <h4>Helpers</h4>
      </div>
      <div className="first-links-block">
        <div className="link-block">
          <img src={insta_img} alt="" />
          <p>helpers_od</p>
        </div>
        <div className="link-block">
          <img src={facebook_img} alt="" />
          <p>facebook</p>
        </div>
      </div>
      <div className="second-links-block">
        <div className="link-block">
          <img src={email_img} alt="" />
          <p>brandy.soto@example.com</p>
        </div>
      </div>
      <div className="footer-btn">
        <button
          onClick={() =>
            auth ? setProjectModal(true) : setRegisterModal(true)
          }
          className="gradient-btn"
        >
          <h4>{auth ? 'Регистрация проекта' : 'Присоединяйся'}</h4>
        </button>
      </div>
    </div>
  );
};

export default Footer;
