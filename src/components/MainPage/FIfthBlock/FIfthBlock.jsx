import React from 'react';
import CauseContainer from './ CauseContainer/ CauseContainer';

import './FIfthBlock.scss';
import cause_img from '../../../img/fifth-img.png';

const FIfthBlock = () => (
  <div id="fifth-block" className="fifth-block">
    <CauseContainer />
    <div className="cause-img">
      <img src={cause_img} alt="" />
    </div>
  </div>
);

export default FIfthBlock;
