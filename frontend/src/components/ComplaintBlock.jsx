import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ComplaintBlock.css";
import {
  getAllComplaints,
  getClientsComplaints,
  getServiceCompaniesComplaints,
} from "../api/dataService.js";

const ComplaintBlock = ({ group }) => {
  const [currentData, setCurrentData] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [userId, setuserId] = useState(localStorage.getItem("id"));

  useEffect(() => {
    if (group === "3") {
      getAllComplaints(setCurrentData);
      console.log(currentData);
    } else if (group === "1") {
      getClientsComplaints(userName, password, userId, setCurrentData);
    } else if (group === "2") {
      getServiceCompaniesComplaints(userName, password, setCurrentData);
    }
  }, []);

  return (
    <div className="complaint-info-block">
      <table className="complaint-result-table">
        <thead>
          <tr>
            <th>Зав. № машины</th>
            <th>Дата отказа</th>
            <th>Наработка, м/час</th>
            <th>Узел отказа</th>
            <th>Описание отказа</th>
            <th>Способ восстановления</th>
            <th>Используемые запасные части</th>
            <th>Дата восстановления</th>
            <th>Организация, проводившая ремонт</th>
            <th>Время простоя техники</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.car_id_details}</td>

                <td>{element.breakage_date}</td>
                <td>{element.running_time}</td>
                <td>
                  <Link to={`details/breakages/${element.breakage_type}`}>
                    {element.breakage_type_details}
                  </Link>
                </td>
                <td>{element.breakage_description}</td>
                <td>
                  <Link to={`details/repair-ways/${element.repairing_way}`}>
                    {element.repairing_way_details}
                  </Link>
                </td>
                <td>{element.spares}</td>
                <td>{element.repair_date}</td>
                <td>
                  <Link
                    to={`details/service-companies/${element.service_company}`}
                  >
                    {element.service_company_details}
                  </Link>
                </td>
                <td>{element.down_time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintBlock;
