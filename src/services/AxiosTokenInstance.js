import Axios from "axios";
import store from "@/store/store";
import { GET_USER_TOKEN_GETTER } from "@/store/storeconstants";

const axiosInstance = Axios.create({});

axiosInstance.interceptors.request.use((config) => {
  const params = new URLSearchParams();
  const token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
  params.append("auth", token);
  config.params = params;
  return config;
});

export default axiosInstance;
