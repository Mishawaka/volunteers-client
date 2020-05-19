import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrRight from '../../../img/arrow-right.svg';
import { EventContext } from '../../../contexts/EventsContext';

import './Items.scss';

const Items = ({ events, date, changeCity }) => {
  const { filterChecks } = useContext(EventContext);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    setEvent(events);
    let evs = [];
    if (changeCity.length !== 0) {
      evs = events.filter((el) => el.city == changeCity);
      setEvent(evs);
    }
    if (filterChecks.length !== 0) {
      let arr = evs.filter((el) =>
        filterChecks.includes(el.project.theme.toLowerCase())
      );
      setEvent(arr);
    }
  }, [events, filterChecks, changeCity]);

  useEffect(() => {
    if (date !== '') {
      console.log(date.toLocaleDateString());
      const arr = events.filter((el) => {
        console.log(el.date.toLocaleDateString());
        return el.date.toLocaleDateString() == date.toLocaleDateString();
      });
      setEvent(arr);
    }
  }, [date, filterChecks]);

  return (
    <div className="events-items">
      {event.length > 0 &&
        event.map((el, id) => (
          <div key={id} className="event-item">
            <div className="item-flex">
              <div>
                <p>{el.city}</p>
                <p>{el.addr}</p>
              </div>
              <div>
                <p>{`${el.date.getDay()} ${el.date.toLocaleDateString('ru-RU', {
                  month: 'long',
                })}`}</p>
                <p>{el.date.toLocaleTimeString('ru-RU').substring(0, 5)}</p>
              </div>
            </div>
            <img
              src={`http://${process.env.REACT_APP_ROOT}s/image/${el.imageUrl}`}
              alt="rocket"
            />
            <h4>{el.name}</h4>
            <div>
              <p>Тема: {el.project.theme}</p>
              <Link to={'/event/' + el.name}>
                <img src={arrRight} alt="arrow-right" />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Items;
