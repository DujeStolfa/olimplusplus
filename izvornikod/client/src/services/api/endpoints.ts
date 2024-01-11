import config from '../../config.json';

const base = config.developmentBase;
export const baseUrl = base;

const authBase = `${base}/auth`;
const usersBase = `${base}/users`;
const dictionariesBase = `${base}/dictionaries`;
const wordsBase = `${base}/words`;
const languagesBase = `${base}/languages`;

export const endpoints = {
  auth: {
    base: authBase,
  },
  users: {
    base: usersBase,
  },
  dictionaries: {
    base: dictionariesBase,
  },
  words: {
    base: wordsBase,
  },
  languages: {
    base: languagesBase,
  }
};
