import axios from "axios";

import { endpoints } from "../endpoints";
import GetStudentDictionariesInput from "../../../types/inputs/dictionary/GetStudentDictionariesInput";

const { dictionaries } = endpoints;

export default {
  getAll: (languageid: number) => axios.get(`${dictionaries.base}/${languageid}`),
  getAllStudents: ({ languageid, studentid }: GetStudentDictionariesInput) => axios.get(`${dictionaries.base}/${languageid}/student/${studentid}`),
}