import React from 'react';

import './ScopeContainer.scss';
import coordinator_img from '../../../../img/MainPageScope/coordinator.svg';
import project_img from '../../../../img/MainPageScope/project.svg';
import person_img from '../../../../img/MainPageScope/person.svg';
import calendar_img from '../../../../img/MainPageScope/calendar.svg';
import group_img from '../../../../img/MainPageScope/group.svg';

const ScopeContainer = () => {
  const right_content = [
    {
      img: person_img,
      title: 'Персонализация',
      description:
        'Профиль который хранит личные данные и проекты которые зарегистрировал или подписался.',
    },
    {
      img: calendar_img,
      title: 'Календарь',
      description:
        'Календарь мерропрития, на любой удобный день и время. Только актуальные данные, которые обновляются.',
    },
    {
      img: group_img,
      title: 'Общество',
      description:
        'Это приложение помогает в поиске людей по инетресам, с которыми вместе можно творить добрый дела.',
    },
  ];

  const left_content = [
    {
      img: coordinator_img,
      title: 'контакты',
      description: 'Контакты для свзязи с координатором и волонтерами.',
    },
    {
      img: project_img,
      title: 'Проекты',
      description:
        'Возможность зарегистрировать проект или свою организацию для посика волонтеров или анонса ивентов.',
    },
  ];

  return (
    <div className="scope-container">
      <div className="left-content">
        {left_content.map((event, id) => (
          <div key={id} className="left-content-block">
            <div className="left-content-text">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
            <div className="left_img">
              <img src={event.img} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="right-content">
        {right_content.map((event, id) => (
          <div key={id} className="right-content-block">
            <div className="right-img">
              <img src={event.img} alt="" />
            </div>
            <div className="right-content-text">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScopeContainer;
