import React from 'react';
import ScopeContainer from './ScopeContainer/ScopeContainer';

import './ForthBlock.scss';
import line from '../../../img/line3.svg';

const ForthBlock = () => (
    <div className="fourth-block">
        <h2>Возможности</h2>
        <img src={line} alt=""/>
        <ScopeContainer />
    </div>
)

export default ForthBlock;