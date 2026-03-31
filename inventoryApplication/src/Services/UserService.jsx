import axios from "axios";

const USER_URL = "http://localhost:9191/invent/users";

export const getAllUsers = () => {
  return axios.get(USER_URL, {
    withCredentials: true
  });
};