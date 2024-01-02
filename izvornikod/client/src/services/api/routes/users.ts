import axios from "axios";

import { endpoints } from "../endpoints";
import RegisterInput from "../../../types/inputs/user/RegisterInput";
import CreateAdminInput from "../../../types/inputs/user/CreateAdminInput";
import EditPasswordInput from "../../../types/inputs/user/EditPasswordInput";
import EditAdminInput from "../../../types/inputs/user/EditAdminInput";
import CreateWordInput from "../../../types/inputs/user/CreateWordInput";

const { users } = endpoints;

export default {
  registerStudent: (data: RegisterInput) => axios.post(`${users.base}/register-student`, data),
  createAdmin: (data: CreateAdminInput) => axios.post(`${users.base}/create-admin`, data),
  getAllAdmin: () => axios.get(`${users.base}/get-admins`),
  deleteAdmin: (adminId: number) => axios.delete(`${users.base}/delete-admin/${adminId}`),
  editAdmin: (admin: EditAdminInput, adminId: number) => axios.post(`${users.base}/edit-admin/${adminId}`, admin),
  editPassword: (data: EditPasswordInput) => axios.put(`${users.base}/edit-password`, data),
  createWord: (data: CreateWordInput, languageId: number) => axios.post(`${users.base}/${languageId}`, data),
};