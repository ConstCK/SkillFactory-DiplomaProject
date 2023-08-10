import React, { useEffect, useState } from "react";
import "../styles/AddCarPage.css";
import { useNavigate } from "react-router-dom";
import {
  getAllServiceCompanies,
  getVehicleList,
  getEngineList,
  getTransmissionList,
  getDrivingAxleList,
  getSteeringAxleList,
  getAllClients,
  postNewCar,
} from "../api/dataService.js";

import { carValidation } from "../utils/validationService.js";

const AddCarPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [allVehicles, setAllVehicles] = useState([]);
  const [allEngines, setAllEngines] = useState([]);
  const [allTransmissions, setAllTransmissions] = useState([]);
  const [allDrivingAxles, setAllDrivingAxles] = useState([]);
  const [allSteeringAxles, setAllSteeringAxles] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allServiceCompanies, setAllServiceCompanies] = useState([]);

  const [postData, setPostData] = useState({
    car_id: "",
    engine_id: "",
    transmission_id: "",
    driving_axle_id: "",
    steering_axle_id: "",
    delivery_contract: "",
    discharge_date: "",
    receiver: "",
    delivery_address: "",
    vehicle_configuration: "",
    vehicle_model: "",
    engine_model: "",
    transmission_model: "",
    driving_axle_model: "",
    steering_axle_model: "",
    client: "",
    service_company: "",
  });

  useEffect(() => {
    getVehicleList(setAllVehicles);
    getEngineList(setAllEngines);
    getTransmissionList(setAllTransmissions);
    getDrivingAxleList(setAllDrivingAxles);
    getSteeringAxleList(setAllSteeringAxles);
    getAllServiceCompanies(setAllServiceCompanies);
    getAllClients(setAllClients);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleCarPost = (e) => {
    e.preventDefault();
    postNewCar(userName, password, postData, navigate);
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="car-adding-block">
      <h1 className="car-adding-title">Добавление данных о погрузчиках</h1>
      <form className="car-form" action="">
        <label htmlFor="car_id">Заводской № машины</label>
        <input
          name="car_id"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="vehicle_model">Модель техники</label>
        <select name="vehicle_model" onChange={handleInputChange} required>
          <option value="">- Выберите модель погрузчика -</option>
          {allVehicles.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="engine_id">Заводской № двигателя</label>
        <input
          name="engine_id"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="engine_model">Модель двигателя</label>
        <select name="engine_model" onChange={handleInputChange} required>
          <option value="">- Выберите модель двигателя -</option>
          {allEngines.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="transmission_id">Заводской № трансмиссии</label>
        <input
          name="transmission_id"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="transmission_model">Модель трансмиссии</label>
        <select name="transmission_model" onChange={handleInputChange} required>
          <option value="">- Выберите модель трансмиссии -</option>
          {allTransmissions.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="driving_axle_id">Заводской № ведущего моста</label>
        <input
          name="driving_axle_id"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="driving_axle_model">Модель ведущего моста</label>
        <select name="driving_axle_model" onChange={handleInputChange} required>
          <option value="">- Выберите модель ведущего моста -</option>
          {allDrivingAxles.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="steering_axle_id">Заводской № управляемого моста</label>
        <input
          name="steering_axle_id"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="steering_axle_model">Модель управляемого моста</label>
        <select
          name="steering_axle_model"
          onChange={handleInputChange}
          required
        >
          <option value="">- Выберите модель управляемого моста -</option>
          {allSteeringAxles.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="discharge_date">Дата отгрузки с завода</label>
        <input
          name="discharge_date"
          type="date"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="client">Покупатель</label>
        <select name="client" onChange={handleInputChange} required>
          <option value="">- Выберите покупапателя -</option>
          {allClients.slice(1).map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.username}
              </option>
            );
          })}
        </select>
        <label htmlFor="delivery_contract">Договор поставки</label>
        <input
          name="delivery_contract"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="receiver">Грузополучатель</label>
        <input
          name="receiver"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="delivery_address">Адрес поставки</label>
        <input
          name="delivery_address"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="vehicle_configuration">Комплектация</label>
        <input
          name="vehicle_configuration"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="service_company">Сервисная компания</label>
        <select name="service_company" onChange={handleInputChange} required>
          <option value="">- Выберите сервисную компанию -</option>
          {allServiceCompanies.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <button
          onClick={handleCarPost}
          className="submit-car-btn"
          type="submit"
          disabled={!carValidation(postData)}
        >
          Добавить данные
        </button>
      </form>
      <button
        onClick={handleReturn}
        className="add-complaint-return-btn"
        type="button"
      >
        Вернуться
      </button>
    </div>
  );
};

export default AddCarPage;
