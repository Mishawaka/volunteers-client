import React, { useState } from 'react';

import FormPage from '../FormPage/FormPage';
import eye from '../../../img/eye.svg';
import activeEye from '../../../img/active-eye.svg';
import './AuthForm.scss';

const AuthForm = ({ modal, setModal, setRegisterModal, setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [blocked, setBlocked] = useState(true);
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onChange = ({ id, value }) => {
    if (id === 'email') {
      setEmail(value);
      check();
    } else if (id === 'password') {
      setPassword(value);
      check();
    }
  };

  const check = () => {
    if (!new RegExp(emailRegex).test(email) || password.length < 6) {
      setBlocked(true);
    } else {
      setBlocked(false);
    }
  };

  const onSubmit = async () => {
    if (blocked) return null;

    const data = {
      email,
      password,
    };
    fetch(`http://${process.env.REACT_APP_ROOT}/api/authenticate`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401) {
          console.log('email or password is incorrect');
          return 0;
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('email', data.email);
        localStorage.setItem('img', data.img);
        setAuth(true);
        setModal(false);
      })
      .catch((err) => console.log(err));
  };

  const changeToRegister = () => {
    setModal(false);
    setTimeout(() => {
      setRegisterModal(true);
    }, 500);
  };

  return (
    <FormPage modal={modal} setModal={setModal}>
      <h1>Добро пожаловать!</h1>
      <h3>Для входа введите свои логин (почту) и пароль</h3>
      <div className="form-group">
        <input
          onChange={(e) => onChange(e.target)}
          value={email}
          type="email"
          id="email"
          className="form-control"
        />
        <label
          htmlFor="email"
          className={
            email === ''
              ? 'form-control-placeholder-off'
              : 'form-control-placeholder-on'
          }
        >
          Логин
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={(e) => onChange(e.target)}
          value={password}
          type={showPass ? 'text' : 'password'}
          id="password"
          className="form-control"
        />
        <img
          onClick={() => setShowPass(!showPass)}
          src={showPass ? activeEye : eye}
          alt="eye"
        />
        <label
          htmlFor="password"
          className={
            password === ''
              ? 'form-control-placeholder-off'
              : 'form-control-placeholder-on'
          }
        >
          Пароль
        </label>
      </div>
      <div className="form-group">
        <label className="auth-checkbox">
          Запомнить меня
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>
      <button
        onClick={onSubmit}
        className={blocked ? 'blocked auth-button' : 'active auth-button'}
      >
        <h4>ВОЙТИ</h4>
      </button>
      <div className="register-invite">
        <p>Новый пользователь?</p>
        <p onClick={changeToRegister}>Зарегистрироваться</p>
      </div>
    </FormPage>
  );
};

export default AuthForm;
