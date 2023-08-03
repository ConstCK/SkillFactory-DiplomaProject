import axios from "axios";

import {
  BASE_URL,
  LOGIN_URL,
  ALL_CARS_URL,
  DEFINITE_CAR,
  CLIENTS_CARS_URL,
  SERVICE_COMPANIES_CARS_URL,
  ALL_MAINTENANCE_URL,
  CLIENTS_MAINTENANCE_URL,
  SERVICE_COMPANIES_MAINTENANCE_URL,
  ALL_COMPLAINTS_URL,
  CLIENTS_COMPLAINTS_URL,
  SERVICE_COMPANIES_COMPLAINTS_URL,
} from "../utils/constants";

const login = (userName, password, setter, redirection) => {
  return axios({
    baseURL: BASE_URL,
    url: LOGIN_URL,
    method: "post",
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
      localStorage.setItem("user", response.data.username);
      localStorage.setItem("password", password);
      localStorage.setItem("group", response.data.groups[0]);
      localStorage.setItem("id", response.data.id);
      setter(true);
      redirection("/");
    })
    .catch((error) => {
      console.log("Ошибка авторизации...", error);
      redirection("/auth-error");
    });
};

const getAllCars = async (setter) => {
  return await axios({
    baseURL: BASE_URL,
    url: ALL_CARS_URL,
    method: "get",
  }).then((response) => {
    setter(response.data);
  });
};

const getClientsCars = (userName, password, id, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: CLIENTS_CARS_URL,
    method: "get",
    params: {
      id: id,
    },
    auth: {
      username: userName,
      password: password,
    },
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getServiceCompaniesCars = (userName, password, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: SERVICE_COMPANIES_CARS_URL,
    method: "get",
    params: {
      name: userName,
    },
    auth: {
      username: userName,
      password: password,
    },
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

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
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getAllMaintenance = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: ALL_MAINTENANCE_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getClientsMaintenance = (userName, password, id, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: CLIENTS_MAINTENANCE_URL,
    method: "get",
    params: {
      id: id,
    },
    auth: {
      username: userName,
      password: password,
    },
  })
    .then((response) => {
      console.log(response);
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getServiceCompaniesMaintenance = (userName, password, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: SERVICE_COMPANIES_MAINTENANCE_URL,
    method: "get",
    params: {
      name: userName,
    },
    auth: {
      username: userName,
      password: password,
    },
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getAllComplaints = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: ALL_COMPLAINTS_URL,
    method: "get",
  })
    .then((response) => {
      console.log(response.data);
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getClientsComplaints = (userName, password, id, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: CLIENTS_COMPLAINTS_URL,
    method: "get",
    params: {
      id: id,
    },
    auth: {
      username: userName,
      password: password,
    },
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getServiceCompaniesComplaints = (userName, password, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: SERVICE_COMPANIES_COMPLAINTS_URL,
    method: "get",
    params: {
      name: userName,
    },
    auth: {
      username: userName,
      password: password,
    },
  })
    .then((response) => {
      console.log(response);
      setter(response.data);
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
      console.log("Ошибка получения подробных данных...", error)
    );
};

export {
  getFilteredCars,
  getAllCars,
  getDetails,
  getClientsCars,
  getServiceCompaniesCars,
  getAllMaintenance,
  getClientsMaintenance,
  getServiceCompaniesMaintenance,
  getAllComplaints,
  getClientsComplaints,
  getServiceCompaniesComplaints,
  login,
};
