import React from 'react';

import './FormContainer.scss';

const FormContainer = ({ email, setEmail, setModal }) => (
  <div className="form-container">
    <h3>
      <span>Н</span>ачни творить добрый дела сейча<span>С</span>
    </h3>
    <h3>
      <span>С</span>тать волонтер легк<span>о!</span>
    </h3>
    <form action="POST">
      <div className="form-group">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
          className="form-control register-sixth"
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
      <button
        onClick={(e) => {
          e.preventDefault();
          setModal(true);
        }}
        className="gradient-btn"
      >
        <h4>Зарегистрироваться</h4>
      </button>
    </form>
  </div>
);

export default FormContainer;
