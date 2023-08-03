import React, { useEffect, useState, useContext } from "react";
import "../styles/MainPage.css";
import InfoPanel from "../components/InfoPanel.jsx";
import SearchPanel from "../components/SearchPanel.jsx";
import resultContext from "../context/createContext";
import { useLocation } from "react-router-dom";

function MainPage() {
  const location = useLocation();
  const [isAuth, setIsAuth] = useContext(resultContext);
  const [limitedData, setLimitedData] = useContext(resultContext);

  useEffect(() => {
    setIsAuth(localStorage.getItem("user"));
  }, [isAuth]);

  return (
    <main className="main-page">
      {isAuth ? <InfoPanel /> : <SearchPanel />}
    </main>
  );
}

export default MainPage;
