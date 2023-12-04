import config from '../../config.json';

const base = config.developmentBase;
export const baseUrl = base;

const authBase = `${base}/auth`;
const usersBase = `${base}/users`;

export const endpoints = {
  auth: {
    base: authBase,
  },
  users: {
    base: usersBase,
  },
};
