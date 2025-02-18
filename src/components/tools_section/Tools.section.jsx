import React from "react";
import "../../styles/general.style.css";
import "./tools.section.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faMessage,
  faPeopleGroup,
  faFolderOpen,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const ToolsSection = () => {
  return (
    <div className="generalStyle toolsSection">
      <div className="tools-header">
        <p className="team-name">😄 GAPLASHAMIZMI</p>
      </div>
      <div className="tools-buttons">
        <div className="tools-section-button">
          <button className="tools-section-button-icon dashboard">
            <FontAwesomeIcon icon={faTableColumns} />
          </button>
          <span><a href="#">Dashboard</a></span>
        </div>

        <div className="tools-section-button">
          <button className="tools-section-button-icon chat">
            <FontAwesomeIcon icon={faMessage} />
          </button>
          <span><a href="#">Chats</a></span>
        </div>

        <div className="tools-section-button">
          <button className="tools-section-button-icon group">
            <FontAwesomeIcon icon={faPeopleGroup} />
          </button>
          <span><a href="#">Groups</a></span>
        </div>

        <div className="tools-section-button">
          <button className="tools-section-button-icon files">
            <FontAwesomeIcon icon={faFolderOpen} />
          </button>
          <span><a href="#">Files</a></span>
        </div>

        <div className="tools-section-button">
          <button className="tools-section-button-icon call">
            <FontAwesomeIcon icon={faCalendarDays} />
          </button>
          <span><a href="#">Calls</a></span>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;
