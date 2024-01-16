import axios from "axios"
import store from "../../redux/store";
import { clearUser } from "../../redux/slices/authSlice";


const configureAxios = () => {
  axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        store.dispatch(clearUser(401));
      }
      return Promise.reject(error);
    }
  );
};

export default configureAxios;