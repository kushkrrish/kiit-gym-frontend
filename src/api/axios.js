import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // your backend
});

export default api;

/* usage->
    import api from "../api/axios";

    export async function login(data) {
    return api.post("/user/signin", data);
    }
*/