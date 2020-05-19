import React from 'react';
import TextContainer from './TextContainer/TextContainer';

import './ProcessWorkContainer.scss';
import line_third from '../../../../img/line3.svg';
import third_block_img from '../../../../img/Third-block-img.svg'

const ProcessWorkContainer = () => (
    <div className="process-work-container">
        <h2>Как это работает</h2>
        <img src={line_third} alt=""/>
        <img className="third-block-img" src={third_block_img} alt=""/>
        <div className="text-block-container">
            <TextContainer />
        </div>
    </div>  
)

export default ProcessWorkContainer;