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
import AuthErrorPage from "./pages/AuthErrorPage.jsx";
import AddMaintenancePage from "./pages/AddMaintenancePage.jsx";
import AddComplaintPage from "./pages/AddComplaintPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import AddCarPage from "./pages/AddCarPage.jsx";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  // const [limitedData, setLimitedData] = useState([]);
  // const [allData, setAllData] = useState([]);
  // const [clientData, setClientData] = useState(resultContext);
  // const [serviceCompanyData, setServiceCompanyData] = useState(resultContext);

  return (
    <React.Fragment>
      <resultContext.Provider
        value={[
          isAuth,
          setIsAuth,
          // limitedData,
          // setLimitedData,
          // allData,
          // setAllData,
          // clientData,
          // setClientData,
          // serviceCompanyData,
          // setServiceCompanyData,
        ]}
      >
        <div className="root-container">
          <Header />
          <Routes>
            <Route path="" element={<MainPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth-error" element={<AuthErrorPage />} />
            <Route path="/details/:type/:id" element={<DetailPage />} />
            <Route path="/add-maintenance" element={<AddMaintenancePage />} />
            <Route path="/add-complaint" element={<AddComplaintPage />} />
            <Route path="/catalogs" element={<CatalogPage />} />
            <Route path="/add-car" element={<AddCarPage />} />
          </Routes>
          <Footer />
        </div>
      </resultContext.Provider>
    </React.Fragment>
  );
}

export default App;
