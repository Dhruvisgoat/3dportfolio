import React from 'react';
import styled from 'styled-components';


const PacmanButton = () => {
  return (
    <button className="pacman-button">
      <span className="button-label">Pac-Man Button</span>
      <div className="ghost"></div>
      <div className="pacman"></div>
    </button>
  );
};

export default PacmanButton;