import React from 'react';

import './TextContainer.scss';
import person_img from '../../../../../img/person.svg';
import spaceship_img from '../../../../../img/spaceship.svg';
import calendar_img from '../../../../../img/calendar.svg';

const s = [
  {
    img: person_img,
    title: 'Волонтер',
    description:
      'Может подписаться на рассылку любой организации. Посещать мерроприятия, а так же подать заявку на волонетрство.',
  },
  {
    img: spaceship_img,
    title: 'Координатор',
    description:
      'Имеет возможность зарегистрировать свой проект/организацию, так же анонсировать мерроприятия. Рассматривает кандидатов на волонтерство.',
  },
  {
    img: calendar_img,
    title: 'календарь',
    description:
      'Календарь мерроприятий организованные организациями. Удобный выбор даты и времени, с ссылками на регистрацию.',
  },
];

const TextContainer = () => (
  s.map((event, id) => (
    <div key={id} className="text-container">
      <img src={event.img} alt="" />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  ))
);

export default TextContainer;
