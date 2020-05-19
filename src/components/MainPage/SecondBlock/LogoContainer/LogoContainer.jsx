import React from 'react';

import './LogoContainer.scss';
import logo_big from '../../../../img/Logo_big.svg';
import logo_line from '../../../../img/Logo_line.svg';

const LogoContainer = () => (
    <div className="logo-container">
        <div className="left-line">
            <img src={logo_line} alt=""/>
        </div>
        <div className="logo-img-block">
            <img src={logo_big} alt=""/>
            <h4>Helpers</h4>
        </div>
        <div className="right-line">
            <img src={logo_line} alt=""/>
        </div>
    </div>  
)

export default LogoContainer;