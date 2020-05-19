import React, { useState, useContext, createRef } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { RegisterContext } from '../../../contexts/RegisterContext';
import { ImageContext } from '../../../contexts/ImageContext';
import ImageCrop from '../ImageCrop/ImageCrop';

import FormPage from '../FormPage/FormPage';
import eye from '../../../img/eye.svg';
import activeEye from '../../../img/active-eye.svg';
import plus from '../../../img/plus.svg';
import './RegisterForm.scss';

const RegisterForm = ({ modal, setModal, setAuthModal }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [blocked, setBlocked] = useState(true);
  const { email, setEmail } = useContext(RegisterContext);
  const { croppedImageUrl, setCroppedImageUrl, file, setFile } = useContext(
    ImageContext
  );
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const clickRef = createRef();

  const check = () => {
    if (
      name === '' ||
      surname === '' ||
      !new RegExp(emailRegex).test(email) ||
      password.length < 6
    ) {
      setBlocked(true);
    } else {
      setBlocked(false);
    }
  };

  const blobToBase64 = function (blob, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      cb(base64);
    };
    reader.readAsDataURL(blob);
  };

  const sendImage = (id, cb) => {
    blobToBase64(file, (base64) => {
      const body = JSON.stringify({
        image: base64,
        name: file.name,
        userId: id,
      });
      fetch(`http://${process.env.REACT_APP_ROOT}/save-user-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
        .then((res) => res.json())
        .then((data) => cb(data))
        .catch((err) => console.log(err));
    });
  };

  const onSubmit = () => {
    check();
    if (blocked) return null;

    const obj = {
      name,
      surname,
      email,
      phone,
      password,
    };
    fetch(`http://${process.env.REACT_APP_ROOT}/api/register`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ ...obj, imageUrl: 'users/.jpg' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFile({});
        setModal(false);
        sendImage(data.id, (result) => {
          setTimeout(() => {
            scroll.scrollTo(0, { smooth: true });
          }, 1000);
          setTimeout(() => {
            setAuthModal(true);
          }, 2000);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormPage modal={modal} setModal={setModal}>
      <h1>Регистрация</h1>
      <h3>Заполните поля</h3>
      <div className="form-group">
        <div
          className={croppedImageUrl ? 'background' : 'blocked background'}
          onClick={croppedImageUrl ? null : () => clickRef.current.click()}
        >
          <img
            style={{ display: croppedImageUrl ? 'block' : 'none' }}
            src={croppedImageUrl}
            alt="cropped"
          />
          <img
            style={{ display: croppedImageUrl ? 'none' : 'block' }}
            src={plus}
            alt="plus"
          />
        </div>
        <ImageCrop aspect={1 / 1} height={100} clickRef={clickRef} />
      </div>
      <div className="form-group">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
          onBlur={check}
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
          Почта
        </label>
      </div>
      <div className="form-group">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          onBlur={check}
          className="form-control"
        />
        <label
          htmlFor="name"
          className={
            name === ''
              ? 'form-control-placeholder-off'
              : 'form-control-placeholder-on'
          }
        >
          Имя
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
          type="text"
          onBlur={check}
          id="surname"
          className="form-control"
        />
        <label
          htmlFor="surname"
          className={
            surname === ''
              ? 'form-control-placeholder-off'
              : 'form-control-placeholder-on'
          }
        >
          Фамилия
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          type="text"
          onBlur={check}
          id="phone"
          className="form-control"
        />
        <label
          htmlFor="phone"
          className={
            phone === ''
              ? 'form-control-placeholder-off'
              : 'form-control-placeholder-on'
          }
        >
          Телефон (без +38)
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPass ? 'text' : 'password'}
          id="password"
          onBlur={check}
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
      <button
        onClick={onSubmit}
        className={
          blocked ? 'blocked register-button' : 'active register-button'
        }
      >
        <h4>ЗАРЕГИСТРИРОВАТЬСЯ</h4>
      </button>
    </FormPage>
  );
};

export default RegisterForm;
