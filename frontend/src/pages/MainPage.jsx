import React, { useEffect, useState } from "react";
import "../styles/MainPage.css";
import InfoPanel from "../components/InfoPanel.jsx";
import SearchPanel from "../components/SearchPanel.jsx";

function MainPage() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user"));
  useEffect(() => {
    setIsAuth(localStorage.getItem("user"));
  }, []);
  return <main>{isAuth ? <InfoPanel /> : <SearchPanel />}</main>;
}

export default MainPage;
