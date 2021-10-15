import axios from "axios";

const URL = "http://localhost:5000/api/v1/auth";

export const apiLongin = (data) => {
    return axios.post(URL + '/login', data);
};
