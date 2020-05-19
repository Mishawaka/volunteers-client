import React from 'react';
import { Slider } from '../../../Slider';

import './ProjectContainer.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import arrRight from '../../../../img/arrow-right.svg';
import { Link } from 'react-router-dom';

const ProjectContainer = ({ projects }) => {
  const viewportWidth = window.innerWidth;
  const viewport = () => {
    if (viewportWidth >= 1750) return 4;
    if (viewportWidth > 900 && viewportWidth < 1750) return 3;
    if (viewportWidth <= 900) return 1;
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: viewport(),
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: false,
  };

  return (
    <div className="project-container">
      <Slider {...settings}>
        {projects.map((pr, id) => (
          <div key={id} className="project-b">
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
      </Slider>
    </div>
  );
};

export default ProjectContainer;
