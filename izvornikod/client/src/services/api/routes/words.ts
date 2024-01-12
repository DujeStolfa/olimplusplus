import axios from "axios";

import { endpoints } from "../endpoints";
import CreateWordInput from "../../../types/inputs/user/CreateWordInput";
import UpdateWordStateInput from "../../../types/inputs/word/UpdateWordStateInput";
import RenameWordInput from "../../../types/inputs/word/RenameWordInput";

const { words } = endpoints;

export default {
  getAll: (languageid: number) => axios.get(`${words.base}/${languageid}`),
  getAllNotInDictionary: (dictionaryid: number) => axios.get(`${words.base}/dict/${dictionaryid}`),
  createWord: (data: CreateWordInput, languageid: number) => axios.post(`${words.base}/${languageid}`, data),
  getAvailable: (dictionaryid: number) => axios.get(`${words.base}/available/${dictionaryid}`),
  getChoices: (dictionaryid: number, wordid: number) => axios.get(`${words.base}/choice/${dictionaryid}/${wordid}`),
  updateWordState: ({ wordid, correct }: UpdateWordStateInput) => axios.put(`${words.base}/state/${wordid}`, { correct: correct }),
  getAllInDictionary: (dictionaryid: number) => axios.get(`${words.base}/in-dict/${dictionaryid}`),
  translate: (word: string, language: string) => axios.get(`${words.base}/getTranslation/${language}/${word}`),
  delete: (wordid: number) => axios.delete(`${words.base}/${wordid}`),
  rename: ({ croatianname, wordid }: RenameWordInput) => axios.put(`${words.base}/${wordid}`, { croatianname: croatianname }),
}
