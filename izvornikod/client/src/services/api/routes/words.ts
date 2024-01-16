import axios from "axios";

import { endpoints } from "../endpoints";
import CreateWordInput from "../../../types/inputs/word/CreateWordInput";
import UpdateWordStateInput from "../../../types/inputs/word/UpdateWordStateInput";
import GetAudioScoreInput from "../../../types/inputs/word/GetAudioScoreInput";

const { words } = endpoints;

export default {
  getAll: (languageid: number) => axios.get(`${words.base}/${languageid}`),
  getAllNotInDictionary: (dictionaryid: number) => axios.get(`${words.base}/dict/${dictionaryid}`),
  createWord: (data: CreateWordInput, languageid: number) => {
    console.log(data)
    console.log(JSON.stringify(data));
    return axios.post(`${words.base}/${languageid}`, data);
    return axios.post(
      `${words.base}/${languageid}`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    return axios.get(`${words.base}/${languageid}`)
  },
  getAvailable: (dictionaryid: number) => axios.get(`${words.base}/available/${dictionaryid}`),
  getChoices: (dictionaryid: number, wordid: number) => axios.get(`${words.base}/choice/${dictionaryid}/${wordid}`),
  updateWordState: ({ wordid, correct }: UpdateWordStateInput) => axios.put(`${words.base}/state/${wordid}`, { correct: correct }),
  getAllInDictionary: (dictionaryid: number) => axios.get(`${words.base}/in-dict/${dictionaryid}`),
  translate: (croatianname: string, destIsocode: string) => axios.get(`${words.base}/getTranslation/${croatianname}/${destIsocode}`),
  delete: (wordid: number) => axios.delete(`${words.base}/${wordid}`),
  getAudioScore: ({ wordid, audiourl }: GetAudioScoreInput) => axios.get(`${words.base}/check-audio/${wordid}/${audiourl}`),
}
