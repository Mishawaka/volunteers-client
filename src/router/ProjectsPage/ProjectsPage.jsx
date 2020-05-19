import React, { useContext, useEffect, useState } from 'react';
import Sort from '../../components/ProjectsPage/Sort/Sort';
import Filter from '../../components/ProjectsPage/Filter/Filter';
import Items from '../../components/ProjectsPage/Items/Items';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { Context } from '../../contexts/Context';

import './ProjectsPage.scss';

const ProjectsPage = ({ history }) => {
  const toggleArrow = ({ target }) => {
    let { classList } = target;
    classList.toggle('sort-active');
  };

  const { projects, setProjects, sort, setSort } = useContext(ProjectContext);
  const { auth } = useContext(Context);
  const [changeFind, setChangeFind] = useState('');
  const [changeCity, setChangeCity] = useState('');
  const [filterChecks, setFilterChecks] = useState([]);

  useEffect(() => {
    if (projects.length === 0) {
      fetch(`http://${process.env.REACT_APP_ROOT}/get-all-projects`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('jwt') }),
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
        .then((data) => setProjects(data))
        .catch((err) => console.log(err));
    }
  }, [auth]);

  useEffect(() => {
    if (projects.length !== 0) {
      fetch(`http://${process.env.REACT_APP_ROOT}/get-last-events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('jwt') }),
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
          let arr = data.map((el) => ({
            projectId: el.project._id,
            createdAt: new Date(el.createdAt),
          }));
          let fullProjects = projects.map((el) => {
            let ids = arr.map((elem) => elem.projectId);
            for (let i in arr) {
              if (!ids.includes(el._id)) {
                return {
                  ...el,
                  lastEvent: new Date(0),
                };
              }
              if (arr[i].projectId == el._id) {
                return {
                  ...el,
                  lastEvent: arr[i].createdAt,
                };
              }
            }
          });
          setProjects(fullProjects);
        })
        .catch((err) => console.log(err));
    }
  }, [projects]);

  const onSortChange = (id) => {
    setSort(id);
  };

  return (
    <div className="projects-page animated fadeIn">
      <h2>Проекты</h2>
      <Sort onSortChange={onSortChange} toggleArrow={toggleArrow} />
      <div className="projects-content">
        <Filter
          changeFind={changeFind}
          setChangeFind={setChangeFind}
          changeCity={changeCity}
          setChangeCity={setChangeCity}
          filterChecks={filterChecks}
          setFilterChecks={setFilterChecks}
          toggleArrow={toggleArrow}
        />
        <Items
          changeFind={changeFind}
          changeCity={changeCity}
          filterChecks={filterChecks}
          projects={projects}
          sort={sort}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
