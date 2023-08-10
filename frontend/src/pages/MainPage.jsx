import React, { useEffect, useContext } from "react";
import "../styles/MainPage.css";
import InfoPanel from "../components/InfoPanel.jsx";
import SearchPanel from "../components/SearchPanel.jsx";
import resultContext from "../context/createContext";
import { useLocation } from "react-router-dom";

function MainPage() {
  const { isAuth, setIsAuth } = useContext(resultContext);

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
