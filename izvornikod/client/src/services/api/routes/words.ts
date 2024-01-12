import axios from "axios";

import { endpoints } from "../endpoints";
import CreateWordInput from "../../../types/inputs/user/CreateWordInput";
import UpdateWordStateInput from "../../../types/inputs/word/UpdateWordStateInput";

const { words } = endpoints;

export default {
  getAll: (languageid: number) => axios.get(`${words.base}/${languageid}`),
  getAllNotInDictionary: (dictionaryid: number) => axios.get(`${words.base}/dict/${dictionaryid}`),
  createWord: (data: CreateWordInput, languageid: number) => axios.post(`${words.base}/${languageid}`, data),
  getAvailable: (dictionaryid: number) => axios.get(`${words.base}/available/${dictionaryid}`),
  getChoices: (dictionaryid: number, wordid: number) => axios.get(`${words.base}/choice/${dictionaryid}/${wordid}`),
  updateWordState: ({ wordid, correct }: UpdateWordStateInput) => axios.put(`${words.base}/state/${wordid}`, { correct: correct }),
  translate: (word: string, language: string) => axios.get(`${words.base}/getTranslation/${language}/${word}`),
}
