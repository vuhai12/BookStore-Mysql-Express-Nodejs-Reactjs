import React from "react";
import "./toggle.css";
const Toggle = ({ toggle, handleToggleChange }) => {
  return (
    <div className='toggle-container' onClick={handleToggleChange}>
      <div className={`toggle-btn ${toggle =='vi' ? "disable" : ""}`}>
        {toggle =='vi' ? "VN" : "EN"}
      </div>
    </div>
  );
};

export default Toggle;
