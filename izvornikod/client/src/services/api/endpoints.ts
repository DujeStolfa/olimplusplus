import config from '../../config.json';

const base = config.developmentBase;
export const baseUrl = base;

const authBase = `${base}/auth`;
const usersBase = `${base}/users`;
const dictionariesBase = `${base}/dictionaries`;

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
};
