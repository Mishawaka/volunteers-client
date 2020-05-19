import React from 'react';

import './EventBlock.scss';
import line_text from '../../../img/line3.svg';
import EventContainer from './EventContainer/EventContainer';
import { Link } from 'react-router-dom';

const EventBlock = ({ events }) => (
  <div className="event-block">
    <div className="event-line-top" />
    <div className="title-block">
      <h2>Ближайшие мероприятия</h2>
      <img src={line_text} alt="" />
    </div>
    <EventContainer events={events} />
    <div className="link-event">
      <Link to="/events">
        <h4>Посмотреть все</h4>
      </Link>
    </div>
    <div className="event-line-bottom" />
  </div>
);

export default EventBlock;
