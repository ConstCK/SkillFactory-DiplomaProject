import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddComplaintPage.css";
import { complaintValidation } from "../utils/validationService.js";
import {
  getAllCars,
  getAllServiceCompanies,
  getServiceCompaniesCars,
  getBreakagesList,
  getRepairWaysList,
  postNewComplaint,
  getServiceCompanyId,
} from "../api/dataService.js";

const AddComplaintPage = () => {
  const navigate = useNavigate();
  const [userId, setuserId] = useState(localStorage.getItem("id"));
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [group, setGroup] = useState(localStorage.getItem("group"));
  const [currentUserCars, setCurrentUserCars] = useState([]);
  const [breakagesList, setBreakagesList] = useState([]);
  const [repairWaysList, setRepairWaysList] = useState([]);
  const [serviceCompanies, setServiceCompanies] = useState([]);
  const [currentServiceCompanyId, setCurrentServiceCompanysId] = useState(
    localStorage.getItem("serviceCompanyId")
  );
  const [postData, setPostData] = useState({
    car_id: "",
    breakage_date: "",
    repair_date: "",
    running_time: "",
    breakage_type: "",
    breakage_description: "",
    repairing_way: "",
    spares: "",
    service_company: "",
  });

  useEffect(() => {
    getAllServiceCompanies(setServiceCompanies);
    getServiceCompanyId(userId);
    if (group === "2") {
      getServiceCompaniesCars(userName, password, setCurrentUserCars);
    } else if (group === "3") {
      getAllCars(setCurrentUserCars);
    }
    getBreakagesList(setBreakagesList);
    getRepairWaysList(setRepairWaysList);
    setCurrentServiceCompanysId(localStorage.getItem("serviceCompanyId"));
  }, []);

  const handleReturn = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleComplaintPost = async (e) => {
    e.preventDefault();

    postNewComplaint(
      userName,
      password,
      group,
      currentServiceCompanyId,
      postData,
      navigate
    );
  };

  return (
    <div className="complaint-adding-block">
      <h1 className="complaint-adding-title">
        Добавление данных о рекламациях
      </h1>
      <form className="complaint-form" action="">
        <label htmlFor="car_id">Заводской № машины</label>
        <select name="car_id" onChange={handleInputChange} required>
          <option value="">- Выберите ваш погрузчик -</option>
          {currentUserCars.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.car_id}
              </option>
            );
          })}
        </select>
        <label htmlFor="breakage_date">Дата отказа</label>
        <input
          name="breakage_date"
          type="date"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="repair_date">Дата восстановления</label>
        <input
          name="repair_date"
          type="date"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="running_time">Наработка, м/час</label>
        <input
          name="running_time"
          type="number"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="breakage_type">Узел отказа</label>
        <select name="breakage_type" onChange={handleInputChange} required>
          <option value="">- Выберите узел отказа -</option>
          {breakagesList.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="repairing_way">Способ восстановления</label>
        <select name="repairing_way" onChange={handleInputChange} required>
          <option value="">- Выберите способ восстановления -</option>
          {repairWaysList.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="breakage_description">Описание отказа</label>
        <input
          name="breakage_description"
          type="text"
          onChange={handleInputChange}
          required
        />
        <label htmlFor="spares">Используемые запасные части</label>
        <input name="spares" type="text" onChange={handleInputChange} />
        {group === "3" && (
          <>
            <label htmlFor="service_company">Организация, проводившая ТО</label>
            <select
              name="service_company"
              onChange={handleInputChange}
              required
            >
              <option value="">-Выберите сервисную компанию-</option>
              {serviceCompanies.map((element) => {
                return (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                );
              })}
            </select>
          </>
        )}
        <button
          onClick={handleComplaintPost}
          className="submit-complaint-btn"
          type="submit"
          disabled={!complaintValidation(postData, group)}
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

export default AddComplaintPage;
