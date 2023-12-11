import axios from "axios";

import { endpoints } from "../endpoints";
import LoginInput from "../../../types/inputs/user/LoginInput";

const { auth } = endpoints;

export default {
  login: (user: LoginInput) => axios.post(`${auth.base}/login`, user),
  getUser: () => axios.get(`${auth.base}/current-user`),
  logout: () => axios.post(`${auth.base}/logout`, null)
};