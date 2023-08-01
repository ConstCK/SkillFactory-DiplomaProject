import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/DetailPage.css";
import { getDetails } from "../api/dataService.js";

const DetailPage = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const url = `${type}/${id}`;
    getDetails(url, setDetails);
  }, []);
  console.log(id);
  console.log(type);
  console.log(details);
  return (
    <div className="details">
      <h1 className="details-title">Детальное описание:</h1>
      <h2 className="details-part-name">{details.verbose_name}</h2>
      <div className="details-name">{details.name}</div>
      <h2 className="details-description-title">Подробное описание:</h2>
      <div className="details-description">{details.description}</div>
    </div>
  );
};

export default DetailPage;
