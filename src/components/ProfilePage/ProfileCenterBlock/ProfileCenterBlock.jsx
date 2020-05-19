import React from 'react';

import './ProfileCenterBlock.scss';

const ProfileCenterBlock = ({ user }) => (
  <div className="profile-block-center">
    {user && (
      <div>
        <h3>Информация обо мне</h3>
        <h4>
          Имя: <span>{user.name}</span>
        </h4>
        <h4>
          Фамилия: <span>{user.surname}</span>
        </h4>
        <h4>
          Почта: <span>{user.email}</span>
        </h4>
        <h4>
          Номер телефона:{' '}
          <span>
            +38 ({user.phone.substring(0, 3)})-{user.phone.substring(3, 6)}-
            {user.phone.substring(6, 10)}
          </span>
        </h4>
      </div>
    )}
  </div>
);

export default ProfileCenterBlock;
