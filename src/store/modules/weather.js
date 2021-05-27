import axios from "axios";

const base_url = "https://api.openweathermap.org/data/2.5/";
const apiKey = process.env.VUE_APP_APPID;

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    async currentWeather(state, city) {
      try {
        const { data } = await axios.get(
          `${base_url}weather?q=${city}&units=metric&lang=fr&APPID=${apiKey}`
        );
        return data;
      } catch (e) {
        return false;
      }
    },
  },
};
