import axios from "axios";

import {
  BASE_URL,
  CARS_URL,
  LOGIN_URL,
  DEFINITE_CAR,
} from "../utils/constants";

const login = (userName, password) => {
  return axios({
    baseURL: BASE_URL,
    url: LOGIN_URL,
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    auth: {
      username: userName,
      password: password,
    },
    data: {
      user: userName,
    },
  })
    .then((response) => {
      console.log("Logged in successfully");
      console.log(response);
    })
    .catch((error) => {
      console.log("Authorization issues...", error);
    });
};

// const getFilteredCars = (id, setter) => {
//   return axios({
//     baseURL: BASE_URL,
//     url: CARS_URL,
//     method: "get",
//   })
//     .then((response) => {
//       const result = [];
//       response.data.map((car) => {
//         if (id == car.car_id) {
//           console.log("ok");
//           result.push(car);
//         }
//       });
//       setter(result);
//     })
//     .catch((error) =>
//       console.log("Ошибка получения данных о погрузчиках", error)
//     );
// };

const getFilteredCars = (id, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: DEFINITE_CAR,
    method: "get",
    params: {
      car_id: id,
    },
  })
    .then((response) => {
      setter(response.data);
      console.log("456");
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getLimitedCars = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: CARS_URL,
    method: "get",
  })
    .then((response) => {
      setter(response);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getDetails = (url, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: url,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

export { getFilteredCars, getLimitedCars, getDetails, login };
