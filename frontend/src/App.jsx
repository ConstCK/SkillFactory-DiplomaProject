import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./styles/variables.css";
import MainPage from "./pages/MainPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AuthPage from "./pages/AuthPage.jsx";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
