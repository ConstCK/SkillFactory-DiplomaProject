import axios from "axios";
import Cookies from "js-cookie";
import {
  BASE_URL,
  CARS_URL,
  LOGIN_URL,
  MAINTENANCE_URL,
} from "../utils/constants";

// const login = (userName, password) => {
//   return axios({
//     baseURL: BASE_URL,
//     url: testUrl,
//     method: "post",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     data: {
//       username: userName,
//       password: password,
//     },
//   })
//     .then((response) => {
//       console.log("Logged in successfully");
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log("Authorization issues...", error);
//     });
// };

const getFilteredCars = (id, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: CARS_URL,
    method: "get",
  })
    .then((response) => {
      const result = [];
      response.data.map((car) => {
        if (id == car.car_id) {
          console.log("ok");
          result.push(car);
        }
      });
      setter(result);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

export { getFilteredCars };
