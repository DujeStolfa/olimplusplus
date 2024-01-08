import axios from "axios";

import { endpoints } from "../endpoints";
import CreateWordInput from "../../../types/inputs/user/CreateWordInput";

const { words } = endpoints;

export default {
  getAll: (wordid: number) => axios.get(`${words.base}/${wordid}`),
  createWord: (data: CreateWordInput, languageid:number) => axios.post(`${words.base}/${languageid}`, data),
}


