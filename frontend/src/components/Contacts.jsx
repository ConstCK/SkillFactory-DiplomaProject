import React from "react";
import "../styles/Constacts.css";
import PhoneIcon from "../assets/images/Telephone-icon.png";
import TelegramIcon from "../assets/images/Telegram-icon.png";

const Contacts = () => {
  return (
    <div className="contacts">
      <img className="icon" src={PhoneIcon} alt="Telephone" />
      <div>+7 (835) 220-12-09</div>
      <img className="icon" src={TelegramIcon} alt="Telegram" />
      <div>+7 (835) 220-12-09</div>
    </div>
  );
};

export default Contacts;
