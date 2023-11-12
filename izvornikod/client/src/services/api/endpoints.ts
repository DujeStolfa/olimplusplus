import config from '../../config.json';

const base = config.developmentBase;
export const baseUrl = base;

const authBase = `${base}/auth`;

export const endpoints = {
  auth: {
    base: authBase,
  },
};
