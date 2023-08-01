import React, { useEffect, useState, useContext } from "react";
import "../styles/MainPage.css";
import InfoPanel from "../components/InfoPanel.jsx";
import SearchPanel from "../components/SearchPanel.jsx";
import resultContext from "../context/createContext";
import { getLimitedCars } from "../api/dataService.js";

function MainPage() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user"));
  const [limitedData, setLimitedData] = useContext(resultContext);

  useEffect(() => {
    // localStorage.setItem("user", "user");
    setIsAuth(localStorage.getItem("user"));
    getLimitedCars(setLimitedData);
  }, []);

  return <main>{isAuth ? <InfoPanel /> : <SearchPanel />}</main>;
}

export default MainPage;
