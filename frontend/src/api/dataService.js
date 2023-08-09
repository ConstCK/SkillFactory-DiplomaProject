import axios from "axios";

import {
  BASE_URL,
  LOGIN_URL,
  ALL_CARS_URL,
  DEFINITE_CAR_URL,
  CLIENTS_CARS_URL,
  SERVICE_COMPANIES_CARS_URL,
  ALL_MAINTENANCE_URL,
  CLIENTS_MAINTENANCE_URL,
  SERVICE_COMPANIES_MAINTENANCE_URL,
  ALL_COMPLAINTS_URL,
  CLIENTS_COMPLAINTS_URL,
  SERVICE_COMPANIES_COMPLAINTS_URL,
  MAINTENANCE_TYPES_URL,
  ALL_SERVICE_COMPANIES_URL,
  BREAKAGES_URL,
  REPAIR_WAY_URL,
  VEHICLES_URL,
  ENGINES_URL,
  TRANSMISSIONS_URL,
  DRIVING_AXLES_URL,
  STEERING_AXLES_URL,
  ALL_CLIENTS_URL,
} from "../utils/constants";

const login = (user, password, setter, redirection) => {
  return axios({
    baseURL: BASE_URL,
    url: LOGIN_URL,
    method: "post",
    auth: {
      username: user,
      password: password,
    },
    data: {
      user: user,
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

const getServiceCompanyId = (userId) => {
  return axios({
    baseURL: BASE_URL,
    url: `service-companies/${userId}/service-company-id`,
    method: "get",
  })
    .then((response) => {
      localStorage.setItem("serviceCompanyId", response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getFilteredCars = (id, setter) => {
  return axios({
    baseURL: BASE_URL,
    url: `cars/${id}/${DEFINITE_CAR_URL}`,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getAllClients = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: ALL_CLIENTS_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getAllCars = async (setter1, setter2) => {
  return await axios({
    baseURL: BASE_URL,
    url: ALL_CARS_URL,
    method: "get",
  }).then((response) => {
    setter1(response.data);
    if (setter2) {
      setter2(response.data);
    }
  });
};

const getClientsCars = (user, password, id, setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: CLIENTS_CARS_URL,
    method: "get",
    params: {
      id: id,
    },
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getServiceCompaniesCars = (user, password, setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: SERVICE_COMPANIES_CARS_URL,
    method: "get",
    params: {
      name: user,
    },
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getAllMaintenance = (setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: ALL_MAINTENANCE_URL,
    method: "get",
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) => console.log("Ошибка получения данных о ТО", error));
};

const getClientsMaintenance = (user, password, id, setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: CLIENTS_MAINTENANCE_URL,
    method: "get",
    params: {
      id: id,
    },
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) => console.log("Ошибка получения данных о ТО", error));
};

const getServiceCompaniesMaintenance = (user, password, setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: SERVICE_COMPANIES_MAINTENANCE_URL,
    method: "get",
    params: {
      name: user,
    },
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) => console.log("Ошибка получения данных о ТО", error));
};

const getAllComplaints = (setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: ALL_COMPLAINTS_URL,
    method: "get",
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) =>
      console.log("Ошибка получения данных о рекламациях", error)
    );
};

const getClientsComplaints = (user, password, id, setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: CLIENTS_COMPLAINTS_URL,
    method: "get",
    params: {
      id: id,
    },
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) =>
      console.log("Ошибка получения данных о рекламациях", error)
    );
};

const getServiceCompaniesComplaints = (user, password, setter1, setter2) => {
  return axios({
    baseURL: BASE_URL,
    url: SERVICE_COMPANIES_COMPLAINTS_URL,
    method: "get",
    params: {
      name: user,
    },
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      setter1(response.data);
      if (setter2) {
        setter2(response.data);
      }
    })
    .catch((error) =>
      console.log("Ошибка получения данных о погрузчиках", error)
    );
};

const getMaintenanceTypes = async (setter) => {
  return await axios({
    baseURL: BASE_URL,
    url: MAINTENANCE_TYPES_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getAllServiceCompanies = async (setter) => {
  return await axios({
    baseURL: BASE_URL,
    url: ALL_SERVICE_COMPANIES_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getBreakagesList = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: BREAKAGES_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getRepairWaysList = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: REPAIR_WAY_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getVehicleList = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: VEHICLES_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getEngineList = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: ENGINES_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getTransmissionList = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: TRANSMISSIONS_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getDrivingAxleList = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: DRIVING_AXLES_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getSteeringAxleList = (setter) => {
  return axios({
    baseURL: BASE_URL,
    url: STEERING_AXLES_URL,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
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

const getAllCatalogs = (url, setter, titleSetter) => {
  return axios({
    baseURL: BASE_URL,
    url: url,
    method: "get",
  })
    .then((response) => {
      setter(response.data);
      titleSetter(response.data[0].verbose_name);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const getUniversalData = (urlPart1, urlPart2, setter, titleSetter) => {
  return axios({
    baseURL: BASE_URL,
    url: `${urlPart1}/${urlPart2}/`,
    method: "get",
  })
    .then((response) => {
      console.log(response.data);
      setter(response.data);
      titleSetter(response.data.name);
    })
    .catch((error) => {
      console.log("Ошибка получения данных...", error);
    });
};

const postNewMaintenance = async (
  user,
  password,
  group,
  serviceCompanyId,
  data,
  redirection
) => {
  if (group === "1") {
    data.service_company = 4;
  } else if (group === "2") {
    data.service_company = serviceCompanyId;
  }

  return await axios({
    baseURL: BASE_URL,
    url: ALL_MAINTENANCE_URL,
    method: "post",
    data: data,
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      redirection("/success");
      return response.data;
    })
    .catch((error) => {
      console.log("Ошибка отправки данных...", error);
      redirection("/fail");
    });
};

const postNewComplaint = async (
  user,
  password,
  group,
  serviceCompanyId,
  data,
  redirection
) => {
  if (group === "2") {
    data.service_company = serviceCompanyId;
  }

  return await axios({
    baseURL: BASE_URL,
    url: ALL_COMPLAINTS_URL,
    method: "post",
    data: data,
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      redirection("/success");
      return response.data;
    })
    .catch((error) => {
      console.log("Ошибка отправки данных...", error);
      redirection("/fail");
    });
};

const postNewCar = async (user, password, data, redirection) => {
  return await axios({
    baseURL: BASE_URL,
    url: ALL_CARS_URL,
    method: "post",
    data: data,
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      redirection("/success");
      return response.data;
    })
    .catch((error) => {
      console.log("Ошибка отправки данных...", error);
      redirection("/fail");
    });
};

const postNewCatalog = async (user, password, url, data, redirection) => {
  return await axios({
    baseURL: BASE_URL,
    url: `${url}/`,
    method: "post",
    data: data,
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      redirection("/success");
      return response.data;
    })
    .catch((error) => {
      console.log("Ошибка отправки данных...", error);
      redirection("/fail");
    });
};

const changeCatalog = async (
  user,
  password,
  urlPart1,
  urlPart2,
  data,
  redirection
) => {
  return await axios({
    baseURL: BASE_URL,
    url: `${urlPart1}/${urlPart2}/`,
    method: "patch",
    data: data,
    auth: {
      username: user,
      password: password,
    },
  })
    .then((response) => {
      redirection("/success");
      return response.data;
    })
    .catch((error) => {
      console.log("Ошибка отправки данных...", error);
      redirection("/fail");
    });
};

export {
  getFilteredCars,
  getAllCars,
  getAllServiceCompanies,
  getAllMaintenance,
  getAllComplaints,
  getDetails,
  getClientsCars,
  getServiceCompaniesCars,
  getClientsMaintenance,
  getServiceCompaniesMaintenance,
  getClientsComplaints,
  getServiceCompaniesComplaints,
  getMaintenanceTypes,
  getServiceCompanyId,
  getBreakagesList,
  getRepairWaysList,
  getVehicleList,
  getEngineList,
  getTransmissionList,
  getDrivingAxleList,
  getSteeringAxleList,
  getAllClients,
  getAllCatalogs,
  getUniversalData,
  postNewMaintenance,
  postNewComplaint,
  postNewCar,
  postNewCatalog,
  changeCatalog,
  login,
};
