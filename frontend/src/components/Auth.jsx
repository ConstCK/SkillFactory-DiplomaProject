import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";

const Auth = () => {
  const myLocation = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUser] = useState(localStorage.getItem("user"));
  const [location, setLocation] = useState(myLocation.pathname);

  useEffect(() => {
    // localStorage.setItem("user", "IP_TRUDNIKOV");
    // testApi("SuperManager", "user1234");
    setLocation(myLocation.pathname);
  }, [location, myLocation, isAuth]);

  const loginHandle = () => {
    navigate("auth");
  };

  const logoutHandle = () => {
    localStorage.setItem("user", "");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <div>
      {isAuth ? (
        <div className="user-info">
          <button onClick={logoutHandle} className="auth-btn">
            Выйти
          </button>
        </div>
      ) : (
        <div className="user-info">
          <button
            onClick={loginHandle}
            className={"auth-btn"}
            hidden={location === "/auth" ? true : false}
          >
            Войти
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
