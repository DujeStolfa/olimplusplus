import axios from "axios";

import { endpoints } from "../endpoints";

const { dictionaries } = endpoints;

export default {
  getAll: (languageid: number) => axios.get(`${dictionaries.base}/${languageid}`),
}