import React, { useContext } from 'react';
import { Context } from '../../../../contexts/Context';

import './RegContainer.scss';

const RegContainer = () => {
  const { setProjectModal } = useContext(Context);
  return (
    <div className="reg-container">
      <div className="reg-line-top" />
      <h2>
        <span>Е</span>сть проект<span>?</span>
      </h2>
      <h3>
        <span>С</span>корее регистриру<span>й</span>
      </h3>
      <h3>
        <span>И</span> привлекай волонтеро<span>в</span>
      </h3>
      <button onClick={() => setProjectModal(true)} className="gradient-btn">
        <h4>Зарегистрироваться</h4>
      </button>
      <div className="reg-line-bottom" />
    </div>
  );
};

export default RegContainer;
