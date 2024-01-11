import axios from "axios";

import { endpoints } from "../endpoints";

const { languages } = endpoints;

export default {
  getAll: () => axios.get(`${languages.base}/all`),
}