import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.3.17:3333"
})