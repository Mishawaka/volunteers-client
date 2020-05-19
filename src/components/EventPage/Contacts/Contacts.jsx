import React from 'react';

import './Contacts.scss';

const Contacts = ({ event }) => {
  const name = `${event.project.coord.name} ${event.project.coord.surname}`;
  return (
    <div className="project-contacts">
      <h1>Контакты</h1>
      <div className="contacts-flex">
        <div className="coord">
          <h4>координатор</h4>
          <div>
            <div>
              <img
                src={`http://${process.env.REACT_APP_ROOT}/image/${event.project.coord.imageUrl}`}
                alt=""
              />
            </div>
            <h3>{name}</h3>
            <p className="email">{event.project.email}</p>
            <p className="phone">{event.project.phone}</p>
          </div>
        </div>
        <div className="contacts">
          <h2>
            <span>Д</span>ля связи с нам<span>и</span>
          </h2>
          <p className="inst">{event.project.inst}</p>
          <p className="facebook">{event.project.facebook}</p>
          <p className="email">{event.project.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
