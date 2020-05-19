import React, { useContext, useEffect, useState } from 'react';
import { Slider } from '../../Slider';
import arrRight from '../../../img/arrow-right.svg';
import { Context } from '../../../contexts/Context';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './Events.scss';
import { Link } from 'react-router-dom';

const Events = ({ project, events }) => {
  const [nearest, setNearest] = useState([]);
  const viewportWidth = window.innerWidth;
  const viewport = () => {
    if (viewportWidth >= 1750) return 4;
    if (viewportWidth > 900 && viewportWidth < 1750) return 3;
    if (viewportWidth <= 900) return 1;
  };
  const { auth } = useContext(Context);

  useEffect(() => {
    let arr = events
      .filter((el) => el.project.name === project.name)
      .map((el) => ({
        ...el,
        date: new Date(el.date),
      }));
    setNearest(arr);
  }, [auth, events]);

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
      {nearest.length > 0 && (
        <Slider {...settings}>
          {nearest.map((ev, id) => (
            <div className="event-item">
              <div className="item-flex">
                <div>
                  <p>{ev.city}</p>
                  <p>{ev.addr}</p>
                </div>
                <div>
                  <p>{`${ev.date.getDay()} ${ev.date.toLocaleDateString(
                    'ru-RU',
                    {
                      month: 'long',
                    }
                  )}`}</p>
                  <p>{ev.date.toLocaleTimeString('ru-RU').substring(0, 5)}</p>
                </div>
              </div>
              <img
                src={`http://${process.env.REACT_APP_ROOT}/image/${ev.imageUrl}`}
                alt="rocket"
              />
              <h4>{ev.name}</h4>
              <p>{ev.descr}</p>
              <div>
                <p>Тема: {ev.project.theme}</p>
                <Link to={'/event/' + ev.name}>
                  <img src={arrRight} alt="arrow-right" />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Events;
