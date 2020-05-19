import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../contexts/Context';

import Name from '../../components/EventPage/Name/Name';
import Description from '../../components/EventPage/Description/Description';
import Contacts from '../../components/EventPage/Contacts/Contacts';
import Events from '../../components/EventPage/Events/Events';

import './EventPage.scss';

const EventPage = () => {
  const { name } = useParams();
  const [event, setEvent] = useState();
  const { auth } = useContext(Context);
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ROOT}/get-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('jwt'), name }),
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('email');
          localStorage.removeItem('img');
          window.location.replace('/');
        } else {
          return res.json();
        }
      })
      .then((data) => {
        let event = {
          ...data,
          date: new Date(data.date),
        };
        setEvent(event);
      })
      .catch((err) => console.log(err));
  }, [auth, name]);

  return (
    <div>
      {event && (
        <div className="project-page animated fadeIn slower">
          <Name event={event} />
          <Description event={event} />
          <Contacts event={event} />
          <Events event={event} />
        </div>
      )}
    </div>
  );
};

export default EventPage;
