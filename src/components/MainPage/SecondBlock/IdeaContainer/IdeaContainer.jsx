import React from 'react';

import './IdeaContainer.scss';
import idea_img from '../../../../img/second-block-img.png';

const IdeaContainer = () => (
    <div className="idea-container">
        <div className="idea-img">
            <img src={idea_img} alt="" />
        </div>
        <div className="idea-text-block">
            <h2>идея</h2>
            <p>Veniam deserunt magna sit commodo elit Lorem adipisicing aliquip reprehenderit laborum ullamco dolor ipsum.
                Cupidatat velit proident cupidatat cillum pariatur dolor ex nulla cupidatat labore do proident. Exercitation aute
                esse incididunt id duis dolore ipsum magna exercitation consectetur elit consequat nulla. 
                Veniam reprehenderit pariatur officia consequat deserunt mollit laborum id id duis excepteur anim ipsum magna. 
                Aliquip anim incididunt nisi enim dolore cillum nulla occaecat amet. 
                Magna fugiat Lorem officia occaecat voluptate officia aliquip Lorem officia adipisicing.</p>
        </div>
    </div>
)

export default IdeaContainer;