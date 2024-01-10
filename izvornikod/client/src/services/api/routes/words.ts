import axios from "axios";

import { endpoints } from "../endpoints";
import CreateWordInput from "../../../types/inputs/user/CreateWordInput";

const { words } = endpoints;

export default {
  getAll: (languageid: number) => axios.get(`${words.base}/${languageid}`),
  getAllNotInDictionary: (dictionaryid: number) => axios.get(`${words.base}/dict/${dictionaryid}`),
  createWord: (data: CreateWordInput, languageid:number) => axios.post(`${words.base}/${languageid}`, data),
}


