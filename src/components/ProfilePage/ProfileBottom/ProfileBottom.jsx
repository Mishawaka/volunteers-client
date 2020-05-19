import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ProfileBottom.scss';
import arrRight from '../../../img/arrow-right.svg';
import { Slider } from '../../Slider';

const Projects = ({ id, pr }) => (
  <div key={id} className="project-item">
    <img
      src={`http://${process.env.REACT_APP_ROOT}/image/${pr.imageUrl}`}
      alt="rocket"
    />
    <h4>{pr.name}</h4>
    <p>{pr.descr}</p>
    <div>
      <p>Тема: {pr.theme}</p>
      <Link to={'/project/' + pr.name}>
        <img src={arrRight} alt="arrow-right" />
      </Link>
    </div>
  </div>
);

const Events = ({ id, el }) => (
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
      src={`http://${process.env.REACT_APP_ROOT}/image/${el.imageUrl}`}
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
);

const MY_PROJECTS = 'my_projects';
const SUBSCRIPTIONS = 'subscriptions';
const EVENTS = 'events';

const sections = {
  [MY_PROJECTS]: {
    tabName: 'Мои проекты',
    component: Projects,
  },
  [SUBSCRIPTIONS]: {
    tabName: 'Подписки',
    component: Projects,
  },
  [EVENTS]: {
    tabName: 'Ивенты',
    component: Events,
  },
};

const ProfileBottom = ({ myProjects, subscribes, events }) => {
  const [activeSection, setActiveSection] = useState(MY_PROJECTS);

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

  const toRender = () => {
    if (activeSection === MY_PROJECTS) {
      return myProjects.map((pr, id) => <Projects id={id} pr={pr} />);
    } else if (activeSection === SUBSCRIPTIONS) {
      return subscribes.map((pr, id) => <Projects id={id} pr={pr} />);
    } else {
      return events.map((el, id) => <Events id={id} el={el} />);
    }
  };

  return (
    <div className="profile-bottom">
      {events.length > 0 && (
        <div>
          <div className="profile-btn-block">
            {Object.keys(sections).map((sectionName) => {
              const className = sectionName === activeSection ? 'active' : '';

              return (
                <button
                  className={className}
                  onClick={() => setActiveSection(sectionName)}
                >
                  {sections[sectionName]['tabName']}
                </button>
              );
            })}
          </div>

          <div className="profile-sliders-block">
            <Slider {...settings}>{toRender()}</Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBottom;
