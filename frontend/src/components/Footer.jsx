import React from "react";
import "../styles/Footer.css";
import Contacts from "./Contacts.jsx";

const Footer = () => {
  return (
    <footer className="footer">
      <Contacts />
      <div className="copyright">Мой силант 2022</div>
    </footer>
  );
};

export default Footer;
