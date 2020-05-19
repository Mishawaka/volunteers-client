import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../contexts/Context';
import { EventContext } from '../../contexts/EventsContext';

import Name from '../../components/ProjectPage/Name/Name';
import Description from '../../components/ProjectPage/Description/Description';
import Contacts from '../../components/ProjectPage/Contacts/Contacts';
import Events from '../../components/ProjectPage/Events/Events';

import './ProjectPage.scss';

const ProjectPage = () => {
  const { name } = useParams();
  const [project, setProject] = useState();
  const [subscribed, setSubscribed] = useState();
  const { auth } = useContext(Context);
  const { events, setEvents } = useContext(EventContext);
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_ROOT}/get-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('jwt'), name }),
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
      .then((data) => {
        setProject(data.project);
        setSubscribed(
          data.project.subscribers.includes(localStorage.getItem('email'))
        );
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [auth, name]);

  useEffect(() => {
    if (events.length === 0) {
      fetch(`http://${process.env.REACT_APP_ROOT}/get-all-events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('jwt'), name }),
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
        .then((data) => {
          setEvents(data);
        })
        .catch((err) => console.log(err));
    }
  }, [auth, name]);

  const subscribe = () => {
    if (project.coord.email !== localStorage.getItem('email')) {
      fetch(`http://${process.env.REACT_APP_ROOT}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: localStorage.getItem('jwt'),
          name: project.name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSubscribed(
            data.subscribers.includes(localStorage.getItem('email'))
          );
          setProject(data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {project && project.coord && (
        <div className="project-page animated fadeIn slower">
          <Name
            subscribed={subscribed}
            subscribe={subscribe}
            project={project}
          />
          <Description
            subscribed={subscribed}
            subscribe={subscribe}
            project={project}
          />
          <Contacts project={project} />
          <Events events={events} project={project} />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
