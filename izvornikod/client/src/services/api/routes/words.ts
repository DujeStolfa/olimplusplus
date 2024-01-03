import axios from "axios";

import { endpoints } from "../endpoints";

const { words } = endpoints;

export default {
  getAll: (wordid: number) => axios.get(`${words.base}/${wordid}`),
}