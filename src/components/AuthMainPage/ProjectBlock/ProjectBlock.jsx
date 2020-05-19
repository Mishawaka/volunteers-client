import React from 'react';
import { Link } from 'react-router-dom';
import ProjectContainer from './ProjectContainer/ProjectContainer';

import './ProjectBlock.scss';
import line_text from '../../../img/line3.svg';

const ProjectBlock = ({ projects }) => (
  <div className="project-block">
    <div className="project-line-top" />
    <div className="title-block">
      <h2>Проекты в вашем городе</h2>
      <img src={line_text} alt="" />
    </div>
    <ProjectContainer projects={projects} />
    <Link to="/projects">
      <h4 className="link-project">Посмотреть все</h4>
    </Link>
    <div className="project-line-bottom" />
  </div>
);

export default ProjectBlock;
