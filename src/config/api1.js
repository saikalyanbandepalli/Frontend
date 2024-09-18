import axios from "axios";

const api1 = axios.create({
  baseURL: "http://localhost:8081/api/",
});

export default api1;
