import React from 'react';

import './RegProjectBlock.scss';
import line_text from '../../../img/line3.svg';
import RegContainer from './RegContainer/RegContainer';

const RegProjectBlock = () => (
    <div className="reg-project-block">
        <div className="title-block">
            <h2>Регистрация</h2>
            <img src={line_text} alt=""/>
            <RegContainer />
        </div>
    </div>
)

export default RegProjectBlock;