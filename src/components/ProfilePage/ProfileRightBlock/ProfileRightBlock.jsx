import React, { useState } from 'react';
import eye from '../../../img/eye.svg';
import activeEye from '../../../img/active-eye.svg';

import './ProfileRightBlock.scss';

const ProfileRightBlock = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(oldPass.length > 7 && newPass.length > 7);
    fetch('http://${process.env.REACT_APP_ROOT}/set-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('jwt'),
        oldPass,
        newPass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-block-right">
      <h3>Безопасность</h3>
      <form onSubmit={(e) => onSubmit(e)} id="form" action="POST">
        <div className="profile-form-group">
          <input
            onChange={(e) => setOldPass(e.target.value)}
            value={oldPass}
            type={showOld ? 'text' : 'password'}
            id="password"
            className="form-control set-pass"
            required
          />
          <img
            onClick={() => setShowOld(!showOld)}
            src={showOld ? activeEye : eye}
            alt="eye"
          />
          <label
            htmlFor="password"
            className={
              oldPass === ''
                ? 'profile-form-control-placeholder-off'
                : 'profile-form-control-placeholder-on'
            }
          >
            Старый пароль
          </label>
        </div>
        <div className="profile-form-group">
          <input
            onChange={(e) => setNewPass(e.target.value)}
            value={newPass}
            type={showNew ? 'text' : 'password'}
            id="password"
            className="form-control set-pass"
            required
          />
          <img
            onClick={() => setShowNew(!showNew)}
            src={showNew ? activeEye : eye}
            alt="eye"
          />
          <label
            htmlFor="password"
            className={
              newPass === ''
                ? 'profile-form-control-placeholder-off'
                : 'profile-form-control-placeholder-on'
            }
          >
            Новый пароль
          </label>
        </div>
        <button className="gradient-btn save-btn">
          <h4>Сохранить</h4>
        </button>
      </form>
    </div>
  );
};

export default ProfileRightBlock;
