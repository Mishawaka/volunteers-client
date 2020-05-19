import React from 'react';
import Carousel from './Carousel';

import './Description.scss';

const Description = ({ event }) => {
  return (
    <div className="project-description">
      <div className="flex">
        <div className="text">
          <h1>Об организации</h1>
          <p>{event.project.descr}</p>
        </div>
        <div className="volunteer-invite">
          <a rel="noopener noreferrer" target="_blank" href={event.regUrl}>
            <button className="gradient-btn">
              <h4>Стать волонтером</h4>
            </button>
          </a>
        </div>
      </div>
      <Carousel images={event.project.images} />
    </div>
  );
};

export default Description;
