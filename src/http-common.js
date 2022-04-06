import axios from "axios";
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios.create({
  baseURL: "http://localhost:5050",
  headers: {
    "Content-type": "application/json"
  }
});
