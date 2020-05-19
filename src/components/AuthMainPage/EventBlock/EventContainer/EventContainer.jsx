import React from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '../../../Slider';

import './EventContainer.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import arrow_img from '../../../../img/arrow_main.svg';

const EventContainer = ({ events }) => {
  const viewportWidth = window.innerWidth;
  const viewport = () => {
    if (viewportWidth >= 1750) return 4;
    if (viewportWidth > 900 && viewportWidth < 1750) return 3;
    if (viewportWidth <= 900) return 1;
  };

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
    <div className="event-b">
      <Slider {...settings}>
        {events.map((ev, id) => (
          <div key={id} className="event-container">
            <div className="event-container-top">
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
            <div className="event-container-center">
              <img
                src={`http://${process.env.REACT_APP_ROOT}/image/${ev.imageUrl}`}
                alt=""
              />
              <h4>{ev.name}</h4>
              <h4>{ev.descr}</h4>
            </div>
            <div className="event-container-bottom">
              <p>Тема: {ev.project.theme}</p>
              <Link to={'/event/' + ev.name}>
                <img src={arrow_img} alt="arrow-right" />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventContainer;
