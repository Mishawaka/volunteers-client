import React from 'react';

import './ProfileLeftBlock.scss';
import plus_img from '../../../img/plus.svg';

const ProfileLeftBlock = ({ setModal }) => (
  <div className="profile-block-left">
    <img
      src={`http://${process.env.REACT_APP_ROOT}/image/${localStorage.getItem(
        'img'
      )}`}
      alt=""
    />
    <div onClick={() => setModal(true)} className="plus-block">
      <img src={plus_img} alt="" />
    </div>
  </div>
);

export default ProfileLeftBlock;
