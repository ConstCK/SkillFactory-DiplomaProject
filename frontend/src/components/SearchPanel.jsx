import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/SearchPanel.css";
import { getFilteredCars } from "../api/dataService.js";
import resultContext from "../context/createContext.js";

const SearchPanel = () => {
  const ref = useRef();
  const [vehicleNumber, setVehicleNumber] = useState("");
  // const [filteredData, setFilteredData] = useContext(resultContext);
  const [filteredData, setFilteredData] = useState({});
  const [resultMessage, setresultmessage] = useState(
    "Укажите номер запрашиваемой техники..."
  );

  useEffect(() => {}, []);

  const searchHandle = async (e) => {
    console.log("123");
    e.preventDefault();
    await getFilteredCars(vehicleNumber, setFilteredData);
    ref.current.value = "";
    setVehicleNumber("");
  };
  console.log(filteredData);

  return (
    <div className="search-panel">
      <h1 className="search-panel-title">
        Проверьте комплектацию и технические характеристики техники Силант
      </h1>
      <form className="search-form" name="searchForm">
        <label className="input-label" htmlFor="loginField">
          Заводской номер погрузчика
        </label>
        <input
          ref={ref}
          name="searchField"
          className="search-field"
          type="text"
          placeholder="Введите заводской номер..."
          onChange={(e) => {
            setVehicleNumber(e.target.value);
          }}
        ></input>
        <button onClick={searchHandle} className="search-btn" type="submit">
          Поиск
        </button>
      </form>
      <h2 className="result-title">Результат поиска:</h2>
      <h2 className="result-content">
        Информация о комплектации и технических характеристиках Вашей модели
      </h2>
      <table className="result-table">
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
          </tr>
        </thead>
        <tbody>
          {filteredData ? (
            <tr>
              <td>{filteredData.car_id}</td>
              <td>
                <Link to={`details/vehicles/${filteredData.vehicle_model}`}>
                  {filteredData.vehicle_model_details}
                </Link>
              </td>
              <td>
                <Link to={`details/engines/${filteredData.engine_model}`}>
                  {filteredData.engine_model_details}
                </Link>
              </td>
              <td>{filteredData.engine_id}</td>
              <td>
                <Link
                  to={`details/transmissions/${filteredData.transmission_model}`}
                >
                  {filteredData.transmission_model_details}
                </Link>
              </td>
              <td>{filteredData.transmission_id}</td>
              <td>
                <Link
                  to={`details/driving-axles/${filteredData.driving_axle_model}`}
                >
                  {filteredData.driving_axle_model_details}
                </Link>
              </td>
              <td>{filteredData.driving_axle_id}</td>
              <td>
                <Link
                  to={`details/steering-axles/${filteredData.steering_axle_model}`}
                >
                  {filteredData.steering_axle_model_details}
                </Link>
              </td>
              <td>{filteredData.steering_axle_id}</td>
            </tr>
          ) : (
            <tr className="no-result">
              <td colSpan={10}>{resultMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPanel;
