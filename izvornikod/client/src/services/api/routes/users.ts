import axios from "axios";

import { endpoints } from "../endpoints";
import RegisterInput from "../../../types/inputs/user/RegisterInput";

const { users } = endpoints;

export default {
  registerStudent: (data: RegisterInput) => axios.post(`${users.base}/register-student`, data),
};