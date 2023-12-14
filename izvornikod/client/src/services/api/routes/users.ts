import axios from "axios";

import { endpoints } from "../endpoints";
import RegisterInput from "../../../types/inputs/user/RegisterInput";
import CreateAdminInput from "../../../types/inputs/user/CreateAdminInput";

const { users } = endpoints;

export default {
  registerStudent: (data: RegisterInput) => axios.post(`${users.base}/register-student`, data),
  createAdmin: (data: CreateAdminInput) => axios.post(`${users.base}/create-admin`, data),
};