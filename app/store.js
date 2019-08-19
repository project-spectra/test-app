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
    convoPracticeDone: 0
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
    setFirstLoad(state, firstLoad) {
      state.firstLoad = firstLoad;
    },
    setExerciseCompletion(state, exercise, num) {
      switch (exercise) {
        case pitchPerfect:
          state.pitchPerfectCompleted = num;
          break;
        case slide:
          state.slideCompleted = num;
          break;
        case bdsd:
          state.bdsdCompleted = num;
          break;
        case convo:
          state.convoPracticeDone = num;
          break;
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
    setExerciseCompletion(context, exercise, num) {
      context.commit('setExerciseCompletion', exercise, num);
      context.commit('save');
    }
  }
});
