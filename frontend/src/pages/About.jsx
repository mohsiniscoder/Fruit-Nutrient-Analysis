import React from 'react';
import './About.css';

const About = () => (
  <div className="about-wrapper">
    <div className="about-container">
      <h1>About This Project</h1>
      <p>
        This web app analyzes fruit images and returns nutritional data using a trained AI model.
        It also uses Zero Trust security principles to protect user data and model integrity.
      </p>
    </div>
  </div>
);

export default About;
