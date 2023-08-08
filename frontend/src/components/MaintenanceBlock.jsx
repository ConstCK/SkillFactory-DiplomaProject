import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MaintenanceBlock.css";
import {
  getAllMaintenance,
  getClientsMaintenance,
  getServiceCompaniesMaintenance,
} from "../api/dataService.js";

const MaintenanceBlock = ({ group }) => {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [userId, setuserId] = useState(localStorage.getItem("id"));

  useEffect(() => {
    if (group === "3") {
      getAllMaintenance(setCurrentData);
    } else if (group === "1") {
      getClientsMaintenance(userName, password, userId, setCurrentData);
    } else if (group === "2") {
      getServiceCompaniesMaintenance(userName, password, setCurrentData);
    }
  }, []);

  const handleAddMaintenance = () => {
    navigate("add-maintenance");
  };
  return (
    <div className="maintenance-info-container">
      <table className="maintenance-result-table">
        <thead>
          <tr>
            <th>Зав. № машины</th>
            <th>Вид ТО</th>
            <th>Дата проведения ТО</th>
            <th>Наработка, м/час</th>
            <th>№ заказ-наряда</th>
            <th>дата заказ-наряда</th>
            <th>Организация, проводившая ТО</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.car_id_details}</td>
                <td>
                  <Link
                    to={`details/maintenance-types/${element.maintenance_type}`}
                  >
                    {element.maintenance_type_info.name}
                  </Link>
                </td>
                <td>{element.maintenance_date}</td>
                <td>{element.running_time}</td>
                <td>{element.order_id}</td>
                <td>{element.order_date}</td>
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
      <button onClick={handleAddMaintenance} className="add-maintenance-btn">
        Добавить данные о ТО
      </button>
    </div>
  );
};

export default MaintenanceBlock;
