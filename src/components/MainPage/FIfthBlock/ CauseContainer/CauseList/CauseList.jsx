import React from 'react';

import './CauseList.scss';

const CauseList = () => {
  const s = [
    {
      num: '1',
      description: 'Насыщенная языковая практика',
    },
    {
      num: '2',
      description: 'Настоящие друзья и новые знакомства',
    },
    {
      num: '3',
      description: 'Опыт в рамках неформального образования ',
    },
    {
      num: '4',
      description: 'Дальнейшие перспективы',
    },
    {
      num: '5',
      description: 'Выход из зоны комфорта',
    },
  ];

  return (
    <div className="cause-list">
      {s.map((event, id) => (
        <div key={id} className="cause-text">
          <span>
            <p>{event.num}</p>
          </span>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CauseList;
