import Vue from 'nativescript-vue'
import Vuex from 'vuex';
import * as ApplicationSettings from "tns-core-modules/application-settings";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    name: "",
    firstLoad: true,
    goal: "",
    pitchPerfectCompleted: 0,
    slideCompleted: 0,
    bdsdCompleted: 0,
    lastOpened: 0
  },
  mutations: {
    load(state) {
      if(ApplicationSettings.getString("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(ApplicationSettings.getString("store")))
        );
      }
    },
    save(state) {
        // Object.assign(state, data);
        ApplicationSettings.setString("store", JSON.stringify(state));
    },
    setName(state, name) {
      state.name = name;
    },
    setGoal(state, goal) {
      state.goal = goal;
    },
    //Set how many times an exercise has been completed for daily tracking
    setFirstLoad(state, firstLoad) {
      state.firstLoad = firstLoad;
    },
    setLastOpened(state, lastOpened) {
      state.lastOpened = lastOpened;
    },
    setPitchPerfectCompletion(state, value) {
      if (value > 2) {
        state.pitchPerfectCompleted = 2;
      } else {
        state.pitchPerfectCompleted = value;
      }
    },
    setBdsdCompletion(state, value) {
      if (value > 2) {
        state.bdsdCompleted = 2;
      } else {
        state.bdsdCompleted = value;
      }
    },
    setSlideCompletion(state, value) {
      if (value > 2) {
        state.slideCompleted = 2;
      } else {
        state.slideCompleted = value;
      }
    }
  },

  getters: {
    //
  },

  actions: {
    setName(context, name) {
      context.commit('setName', name);
      context.commit('save');
    },
    setGoal(context, goal) {
      context.commit('setGoal', goal);
      context.commit('save');
    },
    setFirstLoad(context, firstLoad) {
      context.commit('setFirstLoad', firstLoad);
      context.commit('save');
    },
    setLastOpened(context, lastOpened) {
      context.commit('setLastOpened', lastOpened);
      context.commit('save');
    },
    //Exercise completion
    setPitchPerfectCompletion(context, value) {
      context.commit('setPitchPerfectCompletion', value);
      context.commit('save');
    },
    setBdsdCompletion(context, value) {
      context.commit('setBdsdCompletion', value);
      context.commit('save');
    },
    setSlideCompletion(context, value) {
      context.commit('setSlideCompletion', value);
      context.commit('save');
    }
  }
});
