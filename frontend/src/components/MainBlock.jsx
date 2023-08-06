import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MainBlock.css";
import resultContext from "../context/createContext";
import {
  getAllCars,
  getClientsCars,
  getServiceCompaniesCars,
} from "../api/dataService";

const MainBlock = ({ group }) => {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [userId, setuserId] = useState(localStorage.getItem("id"));

  useEffect(() => {
    if (group === "3") {
      getAllCars(setCurrentData);
    } else if (group === "1") {
      getClientsCars(userName, password, userId, setCurrentData);
    } else if (group === "2") {
      getServiceCompaniesCars(userName, password, setCurrentData);
    }
  }, []);

  const handleAddCar = () => {
    navigate("/add-car");
  };
  return (
    <div className="main-info-block">
      <table className="main-result-table">
        <thead>
          <tr>
            <th>Зав. № машины</th>
            <th>Модель техники</th>
            <th>Модель двигателя</th>
            <th>Зав. № двигателя</th>
            <th>Модель трансмиссии</th>
            <th>Зав. № трансмиссии</th>
            <th>Модель ведущего моста</th>
            <th>Зав. № ведущего моста</th>
            <th>Модель управляемого моста</th>
            <th>Зав. № управляемого моста</th>
            <th>Дата отгрузки с завода</th>
            <th>Покупатель</th>
            <th>Грузополучатель</th>
            <th>Адрес поставки</th>
            <th>Комплектация</th>
            <th>Сервисная компания</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.car_id}</td>
                <td>
                  <Link to={`details/vehicles/${element.vehicle_model}`}>
                    {element.vehicle_model_info.name}
                  </Link>
                </td>
                <td>
                  <Link to={`details/engines/${element.engine_model}`}>
                    {element.engine_model_info.name}
                  </Link>
                </td>
                <td>{element.engine_id}</td>
                <td>
                  <Link
                    to={`details/transmissions/${element.transmission_model}`}
                  >
                    {element.transmission_model_info.name}
                  </Link>
                </td>
                <td>{element.transmission_id}</td>
                <td>
                  <Link
                    to={`details/driving-axles/${element.driving_axle_model}`}
                  >
                    {element.driving_axle_model_info.name}
                  </Link>
                </td>
                <td>{element.driving_axle_id}</td>
                <td>
                  <Link
                    to={`details/steering-axles/${element.steering_axle_model}`}
                  >
                    {element.steering_axle_model_info.name}
                  </Link>
                </td>
                <td>{element.steering_axle_id}</td>
                <td>{element.discharge_date}</td>
                <td>{element.client_info.username}</td>
                <td>{element.receiver}</td>
                <td>{element.delivery_address}</td>
                <td>{element.vehicle_configuration}</td>
                <td>
                  {" "}
                  <Link
                    to={`details/service-companies/${element.service_company}`}
                  >
                    {element.service_company_info.name}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {group === "3" && (
        <button onClick={handleAddCar} className="add-car-btn">
          Добавить данные о погрузчиках
        </button>
      )}
    </div>
  );
};

export default MainBlock;
