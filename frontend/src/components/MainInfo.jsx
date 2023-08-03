import React, { useState, useContext, useEffect } from "react";
import "../styles/MainInfo.css";
import MainBlock from "./MainBlock.jsx";
import resultContext from "../context/createContext.js";
import MaintenanceBlock from "./MaintenanceBlock.jsx";
import ComplaintBlock from "./ComplaintBlock.jsx";

const MainInfo = () => {
  const [currentDataType, setCurrentDataType] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(
    localStorage.getItem("group")
  );

  const handleMainInfo = () => {
    console.log("1");
    setCurrentDataType(1);
  };
  const handleMaintenanceInfo = () => {
    console.log("2");
    setCurrentDataType(2);
  };
  const handleComplaintInfo = () => {
    console.log("3");
    setCurrentDataType(3);
  };
  return (
    <div className="main-info">
      <div className="navigation-bar">
        <button onClick={handleMainInfo} className="nav-btn">
          Общая информация
        </button>
        <button onClick={handleMaintenanceInfo} className="nav-btn">
          ТО
        </button>
        <button onClick={handleComplaintInfo} className="nav-btn">
          Рекламации
        </button>
      </div>
      {currentDataType === 1 && <MainBlock group={currentGroup} />}
      {currentDataType === 2 && <MaintenanceBlock group={currentGroup} />}
      {currentDataType === 3 && <ComplaintBlock group={currentGroup} />}
    </div>
  );
};

export default MainInfo;
