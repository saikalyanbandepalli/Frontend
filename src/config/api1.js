import axios from "axios";

const api1 = axios.create({
  baseURL: "http://localhost:8083/api/",
});

export default api1;
