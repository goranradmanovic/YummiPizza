import axios from "axios";

let baseUrl = 'http://127.0.0.1:8000';

let post = (url, data) => {
  return axios.post(url, data, {
    crossDomain: true,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Content-Type": "application/json",
      data: {}
    }
  });
};

let get = url => {
  return axios.get(url, {
    crossDomain: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json",
      signature: "asd",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
      data: {}
    }
  });
};

export default {
  baseUrl,
  // Auth endpoints
  login(loginData) {
    return post(`${baseUrl}/api/login`, loginData);
  },

  logout() {
    return post(`${baseUrl}/api/logout`);
  },

  // Blocks endpoints
  getAllPizzaItems() {
    return get(`${baseUrl}/api/v1/blocks}`);
  },

  postPizzaOrderData(data) {
    return post(`${baseUrl}/api/orders`, data);
  },

  getSinglePizza(id) {
    return get(`${baseUrl}/api/v1/blocks/${id}`);
  },

  getMenuItems() {
    return get(`${baseUrl}/api/menus`);
  },

  getAllOrders() {
    return get(`${baseUrl}/api/orders`);
  },

  getExchangeRates(urlAPI) {
    return fetch(urlAPI).then(response => response.json())
      .then(data => {return data})
      .catch(error => console.log(error));
  }
};
