import React from 'react';
import Carousel from './Carousel';

import './Description.scss';

const Description = ({ project, subscribe, subscribed }) => {
  const creator = project.coord.email === localStorage.getItem('email');
  console.log(subscribed);
  return (
    <div className="project-description">
      <div className="flex">
        <div className="text">
          <h1>Об организации</h1>
          <p>{project.descr}</p>
        </div>
        <div className="volunteer-invite">
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
      <Carousel images={project.images} />
    </div>
  );
};

export default Description;
