import React, { useContext, useEffect, useState } from 'react';
import { Slider } from '../../Slider';
import arrRight from '../../../img/arrow-right.svg';
import { EventContext } from '../../../contexts/EventsContext';
import { Context } from '../../../contexts/Context';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './Events.scss';
import { Link } from 'react-router-dom';

const Events = ({ event }) => {
  const viewportWidth = window.innerWidth;
  const viewport = () => {
    if (viewportWidth >= 1750) return 4;
    if (viewportWidth > 900 && viewportWidth < 1750) return 3;
    if (viewportWidth <= 900) return 1;
  };

  const { events, setEvents } = useContext(EventContext);
  const { auth } = useContext(Context);
  const [eventsToShow, setEventsToShow] = useState([]);

  useEffect(() => {
    if (events.length === 0) {
      fetch(`http://${process.env.REACT_APP_ROOT}/get-all-events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('jwt') }),
      })
        .then((res) => {
          if (res.status === 401) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('img');
            localStorage.removeItem('email');
            window.location.replace('/');
          } else {
            return res.json();
          }
        })
        .then((data) => setEvents(data))
        .catch((err) => console.log(err));
    }
  }, [auth]);

  useEffect(() => {
    let arr = events.filter(
      (ev) =>
        ev.project.theme === event.project.theme ||
        ev.project.name === event.project.name
    );
    if (arr.length === 1) {
      arr = [...events];
    }
    arr = arr.filter((el) => el._id !== event._id);
    arr = arr.map((el) => ({
      ...el,
      date: new Date(el.date),
    }));
    setEventsToShow(arr);
  }, [events, event]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: viewport(),
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: false,
  };

  return (
    <div className="project-events">
      <h1>ближайшие ивенты</h1>
      <Slider {...settings}>
        {eventsToShow.map((ev, id) => (
          <div key={id} className="event-item">
            <div className="item-flex">
              <div>
                <p>{ev.city}</p>
                <p>{ev.addr}</p>
              </div>
              <div>
                <p>{`${ev.date.getDay()} ${ev.date.toLocaleDateString('ru-RU', {
                  month: 'long',
                })}`}</p>
                <p>{ev.date.toLocaleTimeString('ru-RU').substring(0, 5)}</p>
              </div>
            </div>
            <img
              src={`http://${process.env.REACT_APP_ROOT}/image/${ev.imageUrl}`}
              alt="rocket"
            />
            <h4>{ev.name}</h4>
            <p>{ev.project.descr}</p>
            <div>
              <p>Тема: {ev.project.theme}</p>
              <Link to={'/project/' + ev.name}>
                <img src={arrRight} alt="arrow-right" />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Events;
