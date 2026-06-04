import axios from "axios";

const API = axios.create({
    baseURL: "https://internshipproject-98nc.onrender.com/api"
});

export default API;