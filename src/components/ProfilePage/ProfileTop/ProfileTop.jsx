import React from 'react';

import './ProfileTop.scss';

const ProfileTop = ({ logOut }) => (
  <div className="profile-top">
    <h2>Профиль</h2>
    <button onClick={logOut} className="gradient-btn">
      <h4>Выйти</h4>
    </button>
  </div>
);

export default ProfileTop;
