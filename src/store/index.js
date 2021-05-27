import { createStore } from "vuex";

//Modules
import weather from "./modules/weather";

export default createStore({
  modules: {
    weather,
  },
});
