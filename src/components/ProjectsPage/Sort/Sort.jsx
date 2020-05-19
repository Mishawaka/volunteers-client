import React from 'react';

import './Sort.scss';

const Sort = ({ onSortChange }) => (
  <div className="projects-sort">
    <select
      onChange={({ target }) => onSortChange(target.value)}
      name="sort-projects"
    >
      <option selected value="create">
        По дате создания
      </option>
      <option value="update">По дате обновления</option>
    </select>
  </div>
);

export default Sort;
