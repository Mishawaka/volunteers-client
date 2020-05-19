import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [findProjects, setFindProjects] = useState('');
  const [sort, setSort] = useState('create');
  const [projectId, setProjectId] = useState('');
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
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        findProjects,
        setFindProjects,
        projectId,
        setProjectId,
        sort,
        setSort,
        themes,
        cities,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
