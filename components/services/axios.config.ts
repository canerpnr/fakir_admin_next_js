import axios, { AxiosResponse } from "axios";
export default axios.create({baseURL:'http://localhost:9090'});

export const responseBody = (response:AxiosResponse)=>response.data;