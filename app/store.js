import Vue from 'nativescript-vue'
import Vuex from 'vuex';
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    name: "",
    firstLoad: true,
    goal: ""
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
        Object.assign(state, data);
        ApplicationSettings.setString("store", JSON.stringify(state));
    },
    setName(state, name) {
      state.name = name;
    },
    setGoal(state, goal) {
      state.goal = goal;
    },
    setFirstLoad(state, firstLoad) {
      state.firstLoad = firstLoad;
    }
  },

  getters: {
    //
  },

  actions: {
    setName(context, name) {
      context.commit('setName', name);
    },
    setGoal(context, goal) {
      context.commit('setGoal', goal);
    },
    setFirstLoad(context, firstLoad) {
      context.commit('setFirstLoad', firstLoad);
    }
  }
});
