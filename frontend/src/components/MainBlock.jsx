import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MainBlock.css";
import {
  getAllCars,
  getClientsCars,
  getServiceCompaniesCars,
  getVehicleList,
  getEngineList,
  getTransmissionList,
  getDrivingAxleList,
  getSteeringAxleList,
} from "../api/dataService";

const MainBlock = ({ group }) => {
  const navigate = useNavigate();
  const vehicleRef = useRef(null);
  const engineRef = useRef(null);
  const transmissionRef = useRef(null);
  const drivingAxleRef = useRef(null);
  const steeringAxleRef = useRef(null);
  const [currentData, setCurrentData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [allEngines, setAllEngines] = useState([]);
  const [allDrivingAxles, setAllDrivingAxles] = useState([]);
  const [allSteeringAxles, setAllSteeringAxles] = useState([]);
  const [allTransmissions, setAllTransmissions] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [userId, setuserId] = useState(localStorage.getItem("id"));

  useEffect(() => {
    if (group === "3") {
      getAllCars(setAllData, setCurrentData);
    } else if (group === "1") {
      getClientsCars(userName, password, userId, setAllData, setCurrentData);
    } else if (group === "2") {
      getServiceCompaniesCars(userName, password, setAllData, setCurrentData);
    }
    getVehicleList(setAllVehicles);
    getEngineList(setAllEngines);
    getTransmissionList(setAllTransmissions);
    getDrivingAxleList(setAllDrivingAxles);
    getSteeringAxleList(setAllSteeringAxles);
  }, []);

  const handleAddCar = () => {
    navigate("/add-car");
  };

  const handleVehicleFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.vehicle_model_info.name == e.target.value;
      });
      setCurrentData(result);
      engineRef.current.selected = true;
      transmissionRef.current.selected = true;
      drivingAxleRef.current.selected = true;
      steeringAxleRef.current.selected = true;
    }
  };

  const handleEngineFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.engine_model_info.name == e.target.value;
      });
      setCurrentData(result);
      vehicleRef.current.selected = true;
      transmissionRef.current.selected = true;
      drivingAxleRef.current.selected = true;
      steeringAxleRef.current.selected = true;
    }
  };

  const handleTransmissionFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.transmission_model_info.name == e.target.value;
      });
      setCurrentData(result);
      vehicleRef.current.selected = true;
      engineRef.current.selected = true;
      drivingAxleRef.current.selected = true;
      steeringAxleRef.current.selected = true;
    }
  };

  const handleDrivingAxleFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.driving_axle_model_info.name == e.target.value;
      });
      setCurrentData(result);
      vehicleRef.current.selected = true;
      engineRef.current.selected = true;
      transmissionRef.current.selected = true;
      steeringAxleRef.current.selected = true;
    }
  };

  const handleSteeringAxleFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.steering_axle_model_info.name == e.target.value;
      });
      setCurrentData(result);
      vehicleRef.current.selected = true;
      engineRef.current.selected = true;
      transmissionRef.current.selected = true;
      drivingAxleRef.current.selected = true;
    }
  };

  return (
    <div className="main-info-container">
      <table className="main-result-table">
        <thead>
          <tr>
            <th style={{ width: "250px" }}>Модель техники</th>
            <th>Зав. № машины</th>
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
          <tr>
            <td>
              <select
                className="main-data-filter"
                onChange={handleVehicleFilter}
              >
                <option ref={vehicleRef} value={0}>
                  Все
                </option>
                {allVehicles.map((element) => {
                  return (
                    <option key={element.id} value={element.name}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </td>
            <td className="empty-cell"></td>
            <td>
              <select
                className="main-data-filter"
                onChange={handleEngineFilter}
              >
                <option ref={engineRef} value={0}>
                  Все
                </option>
                {allEngines.map((element) => {
                  return (
                    <option key={element.id} value={element.name}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </td>
            <td className="empty-cell"></td>
            <td>
              <select
                className="main-data-filter"
                onChange={handleTransmissionFilter}
              >
                <option ref={transmissionRef} value={0}>
                  Все
                </option>
                {allTransmissions.map((element) => {
                  return (
                    <option key={element.id} value={element.name}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </td>
            <td className="empty-cell"></td>
            <td>
              <select
                className="main-data-filter"
                onChange={handleDrivingAxleFilter}
              >
                <option ref={drivingAxleRef} value={0}>
                  Все
                </option>
                {allDrivingAxles.map((element) => {
                  return (
                    <option key={element.id} value={element.name}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </td>
            <td className="empty-cell"></td>
            <td>
              <select
                className="main-data-filter"
                onChange={handleSteeringAxleFilter}
              >
                <option ref={steeringAxleRef} value={0}>
                  Все
                </option>
                {allSteeringAxles.map((element) => {
                  return (
                    <option key={element.id} value={element.name}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </td>
            <td colSpan={12} className="empty-cell"></td>
          </tr>
          {currentData.map((element) => {
            return (
              <tr key={element.id}>
                <td>
                  <Link to={`details/vehicles/${element.vehicle_model}`}>
                    {element.vehicle_model_info.name}
                  </Link>
                </td>
                <td>{element.car_id}</td>
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
