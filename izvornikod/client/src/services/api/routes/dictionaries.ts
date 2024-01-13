import axios from "axios";

import { endpoints } from "../endpoints";
import GetStudentDictionariesInput from "../../../types/inputs/dictionary/GetStudentDictionariesInput";
import CreateDictionaryInput from "../../../types/inputs/dictionary/CreateDictionaryInput";
import RenameDictionaryInput from "../../../types/inputs/dictionary/RenameDictionaryInput";
import AddWordsToDictionaryInput from "../../../types/inputs/dictionary/AddWordsToDictInput";

const { dictionaries } = endpoints;

export default {
  getAll: (languageid: number) => axios.get(`${dictionaries.base}/${languageid}`),
  getAllStudents: ({ languageid, studentid }: GetStudentDictionariesInput) => axios.get(`${dictionaries.base}/${languageid}/student/${studentid}`),
  delete: (dictionaryid: number) => axios.delete(`${dictionaries.base}/${dictionaryid}`),
  create: ({ dictionaryname, languageid }: CreateDictionaryInput) => axios.post(`${dictionaries.base}/${languageid}`, { dictionaryname: dictionaryname }),
  rename: ({ dictionaryname, dictionaryid }: RenameDictionaryInput) => axios.put(`${dictionaries.base}/${dictionaryid}`, { dictionaryname: dictionaryname }),
}