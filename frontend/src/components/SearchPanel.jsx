import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/SearchPanel.css";
import { getFilteredCars } from "../api/dataService.js";

const SearchPanel = () => {
  const ref = useRef();
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    console.log("data from effect", filteredData);
  }, [filteredData]);

  const searchHandle = async () => {
    await getFilteredCars(vehicleNumber, setfilteredData);
    ref.current.value = "";
    setVehicleNumber("");
    if (filteredData.length == 0) {
      setSearchMessage(
        `Данных о машине номером ${vehicleNumber} нет в системе`
      );
    }
  };

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
          placeholder="Введите заводской номер "
          onChange={(e) => {
            setVehicleNumber(e.target.value);
          }}
        ></input>
        <button onClick={searchHandle} className="search-btn" type="button">
          Поиск
        </button>
      </form>
      <div className="result-title">Результат поиска:</div>
      <div className="result-content">
        Информация о комплектации и технических характеристиках Вашей модели
      </div>
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
          {filteredData.length > 0 ? (
            filteredData.map((el) => {
              return (
                <tr key={el.id}>
                  <td>{el.car_id}</td>
                  <td>{el.vehicle_model_details}</td>
                  <td>{el.engine_model_details}</td>
                  <td>{el.engine_id}</td>
                  <td>{el.transmission_model_details}</td>
                  <td>{el.transmission_id}</td>
                  <td>{el.driving_axle_model_details}</td>
                  <td>{el.driving_axle_id}</td>
                  <td>{el.steering_axle_model_details}</td>
                  <td>{el.steering_axle_id}</td>
                </tr>
              );
            })
          ) : (
            <tr className="no-result">
              <td colSpan={10}>{searchMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPanel;
