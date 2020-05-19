import React from 'react';

import './Name.scss';

const Name = ({ project, subscribe, subscribed }) => {
  const creator = project.coord.email === localStorage.getItem('email');

  return (
    <div className="project-name">
      <h3>Тема: {project.theme}</h3>
      <div className="name">
        <div className="image">
          <img
            src={`http://${process.env.REACT_APP_ROOT}/image/${project.imageUrl}`}
            alt=""
          />
        </div>
        <h1>{project.name}</h1>
      </div>
      <div className="volunteer">
        <button
          onClick={creator ? null : subscribe}
          className={creator || subscribed ? 'disabled-gradient' : ''}
        >
          <h4>
            {creator
              ? 'Вы - создатель'
              : subscribed
              ? 'Вы подписаны'
              : 'Подпишись'}
          </h4>
        </button>
      </div>
    </div>
  );
};

export default Name;
