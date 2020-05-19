import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [filterChecks, setFilterChecks] = useState([]);
  const [date, setDate] = useState('');
  const [eventId, setEventId] = useState('');
  const [prForEvent, setPrForEvent] = useState([]);
  const themes = [
    'помощь пожилым людям',
    'помощь сиротам',
    'помощь многодетным семьям',
    'помощь животным',
    'эко инициативы',
    'студенческие инициативы',
    'облагораживание города',
    'волонтерим и путешествуем',
  ];
  const cities = ['Одесса', 'Киев', 'Львов', 'Харьков', 'Днепр'];
  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        filterChecks,
        setFilterChecks,
        date,
        setDate,
        eventId,
        setEventId,
        prForEvent,
        setPrForEvent,
        themes,
        cities,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
