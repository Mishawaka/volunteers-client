import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrRight from '../../../img/arrow-right.svg';

import './Items.scss';

const Items = ({ projects, changeFind, changeCity, filterChecks, sort }) => {
  const [proj, setProj] = useState([]);

  useEffect(() => {
    if (projects.length !== 0) {
      setProj([...projects]);
      let arr = [...proj];
      if (sort === 'update') {
        arr = arr.sort((a, b) => b.lastEvent - a.lastEvent);
        setProj(arr);
      }
      if (changeCity.length !== 0) {
        arr = projects.filter((el) => el.city == changeCity);
        setProj(arr);
      }
      if (filterChecks.length !== 0) {
        arr = arr.filter((el) => filterChecks.includes(el.theme.toLowerCase()));
        setProj(arr);
      }
      if (changeFind.length !== 0) {
        const reg = new RegExp(changeFind);
        arr = arr.filter(
          ({ name, descr, org }) =>
            reg.test(name) || reg.test(org) || reg.test(descr)
        );
        setProj(arr);
      }
    }
  }, [filterChecks, changeFind, changeCity, sort, projects]);

  return (
    <div className="projects-items">
      {proj.length > 0 &&
        proj.map((pr, id) => (
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
        ))}
    </div>
  );
};

export default Items;
