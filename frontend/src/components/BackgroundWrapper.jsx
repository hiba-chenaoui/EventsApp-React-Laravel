import React from "react";
import "./BackgroundWrapper.css";

const BackgroundWrapper = ({ children, image }) => {
  return (
    <div className="background-wrapper" style={{ backgroundImage: `url(${image})` }}>
      <div className="overlay">{children}</div>
      </div>
  );
};

export default BackgroundWrapper;
