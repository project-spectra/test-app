import Vue from 'nativescript-vue'
import Vuex from 'vuex';
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    name: "",
    firstLoad: true
  },
  mutations: {
    load(state) {
      if(ApplicationSettings.getString("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(ApplicationSettings.getString("store")))
        );
      }
    },
    save(state, data) {
        /*state.name = data.name;
        state.firstLoad = data.firstLoad;*/
        Object.assign(state, data);
        ApplicationSettings.setString("store", JSON.stringify(state));
    }
  }
});
