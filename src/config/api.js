import axios from "axios";

const api = axios.create({
  baseURL: "https://revhire-gkcnc4dvbqchbya0.southindia-01.azurewebsites.net/api/",
});

export default api;
