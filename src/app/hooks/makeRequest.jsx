import axios from "axios";

export const makeRequest = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Authorization: "bearer " + process.env.JWT_SECRET,
    },
});