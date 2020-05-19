import React, { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';
import { Modal } from 'react-responsive-modal';
import RegisterForm from '../forms/RegisterForm/RegisterForm';
import AuthPage from '../forms/AuthForm/AuthForm';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import 'react-responsive-modal/styles.css';
import './Header.scss';
import logo_img from '../../img/Subtract.svg';
import auth_img from '../../img/Auth.svg';
import user_img from '../../img/person-1.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const {
    registerModal,
    setRegisterModal,
    authModal,
    setAuthModal,
    setAuth,
    auth,
  } = useContext(Context);

  useEffect(() => {
    console.log('useEffect');
    fetch(`http://${process.env.REACT_APP_ROOT}/checkToken`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ token: localStorage.getItem('jwt') }),
    })
      .then((res) => (res.status === 200 ? setAuth(true) : setAuth(false)))
      .catch((err) => console.log(err));
  }, [auth]);

  return (
    <div name="header" className="header">
      <Modal
        classNames={{ modal: 'modal-class' }}
        open={registerModal}
        onClose={() => setRegisterModal(false)}
        center
      >
        <RegisterForm
          modal={registerModal}
          setAuthModal={setAuthModal}
          setModal={setRegisterModal}
        />
      </Modal>
      <Modal
        classNames={{ modal: 'modal-class' }}
        open={authModal}
        onClose={() => setAuthModal(false)}
        center
      >
        <AuthPage
          modal={authModal}
          setRegisterModal={setRegisterModal}
          setAuth={setAuth}
          setModal={setAuthModal}
        />
      </Modal>
      <div className="logo-block">
        <img src={logo_img} alt="" />
        <h4>Helpers</h4>
      </div>
      <div className="menu">
        <div
          className={
            window.location.pathname === '/'
              ? 'menu-item selected animated fadeIn faster'
              : 'menu-item'
          }
        >
          <Link to="/">
            <h4 className="menu-text">Главная</h4>
          </Link>
        </div>
        <div
          className={
            window.location.pathname === '/projects'
              ? 'menu-item selected animated fadeIn faster'
              : 'menu-item'
          }
        >
          {auth ? (
            <Link to="/projects">
              <h4 className="menu-text">Проекты</h4>
            </Link>
          ) : (
            <h4 onClick={() => setAuthModal(true)} className="menu-text">
              Проекты
            </h4>
          )}
        </div>
        <div
          className={
            window.location.pathname === '/events'
              ? 'menu-item selected animated fadeIn faster'
              : 'menu-item'
          }
        >
          {auth ? (
            <Link to="/events">
              <h4 className="menu-text">Ивенты</h4>
            </Link>
          ) : (
            <h4 onClick={() => setAuthModal(true)} className="menu-text">
              Ивенты
            </h4>
          )}
        </div>
        <div
          style={{ display: localStorage.getItem('jwt') ? 'none' : 'block' }}
          className="menu-item"
        >
          <ScrollLink smooth={true} duration={1000} to="sixth-block">
            <h4 className="menu-text">Контакты</h4>
          </ScrollLink>
        </div>
      </div>
      <div className="header-right-block">
        <button
          style={{ display: auth ? 'none' : 'block' }}
          onClick={() => setRegisterModal(true)}
          className="gradient-btn"
        >
          <h4>Присоединиться</h4>
        </button>
        <div className={auth ? 'user-img' : ''}>
          <img
            style={{ display: auth ? 'none' : 'block' }}
            onClick={() => setAuthModal(true)}
            src={auth_img}
            alt="auth"
          />
          <Link to="/profile">
            <img
              style={{ display: auth ? 'block' : 'none' }}
              src={
                localStorage.getItem('img')
                  ? `http://${
                      process.env.REACT_APP_ROOT
                    }/image/${localStorage.getItem('img')}`
                  : user_img
              }
              alt="user"
            />
          </Link>
        </div>
        <div className="language-block">
          <h4>Укр</h4>
          <h4>Рус</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
