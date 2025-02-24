import React from "react";
import "../../styles/general.style.css";
import "./tools.section.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faPeopleGroup,
  faFloppyDisk,
  faCalendar,
  faUser,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

// tools section
const ToolsSection = () => {
  return (
    <div className="generalStyle toolsSection">
      <div className="tools-header">
        <p className="team-name">😄 GAPLASHAMIZMI</p>
      </div>

      {/* tools section buttons */}
      <div className="tools-buttons">
        
        {/* account */}
        <div className="tools-section-button">
          <button className="tools-section-button-icon account">
            <FontAwesomeIcon icon={faUser} />
          </button>
          <span>
            <a href="#">Account</a>
          </span>
        </div>

        {/* groups */}
        <div className="tools-section-button">
          <button className="tools-section-button-icon group">
            <FontAwesomeIcon icon={faPeopleGroup} />
          </button>
          <span>
            <a href="#">Groups</a>
          </span>
        </div>

        {/* saved messages */}
        <div className="tools-section-button">
          <button className="tools-section-button-icon messages">
            <FontAwesomeIcon icon={faBookmark} />
          </button>
          <span>
            <a href="#">Saved Messages</a>
          </span>
        </div>

        {/* calendar */}
        <div className="tools-section-button">
          <button className="tools-section-button-icon calendar">
            <FontAwesomeIcon icon={faCalendar} />
          </button>
          <span>
            <a href="#">Calendar</a>
          </span>
        </div>

        {/* settings */}
        <div className="tools-section-button">
          <button className="tools-section-button-icon settings">
            <FontAwesomeIcon icon={faGear} />
          </button>
          <span>
            <a href="#">Settings</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;
