import React, { useContext, useEffect, useState } from "react";
import "../styles/InfoPanel.css";
import { GROUPS } from "../utils/constants.js";
import resultContext from "../context/createContext";
import { getLimitedCars } from "../api/dataService";
import MainInfo from "./MainInfo.jsx";

const InfoPanel = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [group, setGroup] = useState(localStorage.getItem("group"));
  return (
    <div className="info-panel">
      <h2 className="main-user-info">
        {GROUPS[group]}: {user}
      </h2>
      <h1 className="info-panel-title">
        Информация о комплектациях и технических характеристиках Вашей техники
      </h1>
      <MainInfo />
    </div>
  );
};

export default InfoPanel;
