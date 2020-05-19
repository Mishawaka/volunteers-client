import React from 'react';

import './Name.scss';

const Name = ({ event }) => {
  return (
    <div className="event-name">
      <div className="inline-flex">
        <h3>Тема: {event.project.theme}</h3>
        <div>
          <div>
            <h3>{event.city}</h3>
            <h3>{event.addr}</h3>
          </div>
          <div>
            <h3>{`${event.date.getDay()} ${event.date.toLocaleDateString(
              'ru-RU',
              {
                month: 'long',
              }
            )}`}</h3>
            <h3>{event.date.toLocaleTimeString('ru-RU').substring(0, 5)}</h3>
          </div>
        </div>
      </div>
      <div className="name">
        <div className="image">
          <img
            src={`http://${process.env.REACT_APP_ROOT}/image/${event.imageUrl}`}
            alt=""
          />
        </div>
        <h1>{event.name}</h1>
      </div>
      <div className="volunteer">
        <a rel="noopener noreferrer" target="_blank" href={event.regUrl}>
          <button>
            <h4>стать волонтером</h4>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Name;
