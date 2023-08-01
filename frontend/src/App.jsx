import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import resultContext from "./context/createContext";
import "./App.css";
import "./styles/variables.css";
import MainPage from "./pages/MainPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";

function App() {
  const [limitedData, setLimitedData] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <React.Fragment>
      <resultContext.Provider
        value={[limitedData, setLimitedData, isAuth, setIsAuth]}
      >
        <Header />
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/details/:type/:id" element={<DetailPage />} />
        </Routes>
        <Footer />
      </resultContext.Provider>
    </React.Fragment>
  );
}

export default App;
