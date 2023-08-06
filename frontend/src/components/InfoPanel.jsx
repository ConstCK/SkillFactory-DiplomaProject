import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/InfoPanel.css";
import { GROUPS, SWAGGER_URL } from "../utils/constants.js";
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
      <div className="title-container">
        <h1 className="info-panel-title">
          Информация о комплектациях и технических характеристиках Вашей техники
        </h1>
        {group === "3" && (
          <div className="swagger-container">
            <Link className="catalog-link" to={"/catalogs"}>
              Справочники
            </Link>
            <a className="swagger-link" href={SWAGGER_URL} target="_blank">
              API-Инструкция
            </a>
          </div>
        )}
      </div>
      <MainInfo />
    </div>
  );
};

export default InfoPanel;
