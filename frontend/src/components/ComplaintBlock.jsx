import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ComplaintBlock.css";
import {
  getAllComplaints,
  getClientsComplaints,
  getServiceCompaniesComplaints,
  getBreakagesList,
  getRepairWaysList,
  getAllServiceCompanies,
} from "../api/dataService.js";

const ComplaintBlock = ({ group }) => {
  const navigate = useNavigate();
  const breakageRef = useRef(null);
  const repairRef = useRef(null);
  const serviceCompanyRef = useRef(null);
  const [currentData, setCurrentData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allBreakages, setAllBreakages] = useState([]);
  const [allRepairWays, setAllRepairWays] = useState([]);
  const [allServiceCompanies, setAllServiceCompanies] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [userId, setuserId] = useState(localStorage.getItem("id"));

  useEffect(() => {
    if (group === "3") {
      getAllComplaints(setAllData, setCurrentData);
    } else if (group === "1") {
      getClientsComplaints(
        userName,
        password,
        userId,
        setAllData,
        setCurrentData
      );
    } else if (group === "2") {
      getServiceCompaniesComplaints(
        userName,
        password,
        setAllData,
        setCurrentData
      );
    }
    getBreakagesList(setAllBreakages);
    getRepairWaysList(setAllRepairWays);
    getAllServiceCompanies(setAllServiceCompanies);
  }, []);

  const handleAddComplaint = () => {
    navigate("/add-complaint");
  };

  const handleBreakageFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.breakage_type_info.name == e.target.value;
      });
      setCurrentData(result);
    }
    repairRef.current.selected = true;
    if (group !== "2") {
      serviceCompanyRef.current.selected = true;
    }
  };

  const handleRepairFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.repairing_way_info.name == e.target.value;
      });
      setCurrentData(result);
    }
    breakageRef.current.selected = true;
    if (group !== "2") {
      serviceCompanyRef.current.selected = true;
    }
  };

  const handleServiceCompanyFilter = (e) => {
    if (e.target.value == 0) {
      setCurrentData(allData);
    } else {
      const result = allData.filter((item) => {
        return item.service_company_info.name == e.target.value;
      });
      setCurrentData(result);
    }
    breakageRef.current.selected = true;
    repairRef.current.selected = true;
  };

  return (
    <div className="complaint-info-container">
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
          <tr>
            <td colSpan={3} className="empty-cell"></td>
            <td>
              <select
                className="complaint-data-filter"
                onChange={handleBreakageFilter}
              >
                <option ref={breakageRef} value={0}>
                  Все
                </option>
                {allBreakages.map((element) => {
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
                className="complaint-data-filter"
                onChange={handleRepairFilter}
              >
                <option ref={repairRef} value={0}>
                  Все
                </option>
                {allRepairWays.map((element) => {
                  return (
                    <option key={element.id} value={element.name}>
                      {element.name}
                    </option>
                  );
                })}
              </select>
            </td>
            <td colSpan={2} className="empty-cell"></td>
            {group !== "2" ? (
              <td>
                <select
                  className="complaint-data-filter"
                  onChange={handleServiceCompanyFilter}
                >
                  <option ref={serviceCompanyRef} value={0}>
                    Все
                  </option>
                  {allServiceCompanies.map((element) => {
                    return (
                      <option key={element.id} value={element.name}>
                        {element.name}
                      </option>
                    );
                  })}
                </select>
              </td>
            ) : (
              <td className="empty-cell"></td>
            )}
            <td className="empty-cell"></td>
          </tr>
          {currentData.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.car_id_details}</td>

                <td>{element.breakage_date}</td>
                <td>{element.running_time}</td>
                <td>
                  <Link to={`details/breakages/${element.breakage_type}`}>
                    {element.breakage_type_info.name}
                  </Link>
                </td>
                <td>{element.breakage_description}</td>
                <td>
                  <Link to={`details/repair-ways/${element.repairing_way}`}>
                    {element.repairing_way_info.name}
                  </Link>
                </td>
                <td>{element.spares}</td>
                <td>{element.repair_date}</td>
                <td>
                  <Link
                    to={`details/service-companies/${element.service_company}`}
                  >
                    {element.service_company_info.name}
                  </Link>
                </td>
                <td>{element.down_time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(group === "2" || group === "3") && (
        <button onClick={handleAddComplaint} className="add-complaint-btn">
          Добавить данные о рекламациях
        </button>
      )}
    </div>
  );
};

export default ComplaintBlock;
