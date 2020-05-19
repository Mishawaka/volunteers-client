import React from 'react';
import CauseList from './CauseList/CauseList';

import './CauseContainer.scss';

const CauseContainer = () => (
    <div className="cause-container">
        <h2>5 причин стать волонтером</h2>
        <CauseList />
    </div>
)

export default CauseContainer;