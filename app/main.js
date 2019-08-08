import Vue from 'nativescript-vue'
import Vuex from 'vuex';
import App from './components/App'

import VueDevtools from 'nativescript-vue-devtools'
import { store } from './store.js'
import Welcome from "./components/OnboardingScreens/Welcome";

import RadDataForm from 'nativescript-ui-dataform/vue';

Vue.use(RadDataForm);


if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
Vue.use(Vuex);
// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = (TNS_ENV === 'production')
Vue.config.silent = false;

// https://github.com/nstudio/nativescript-checkbox
Vue.registerElement('CheckBox', () => require('@nstudio/nativescript-checkbox').CheckBox, {
    model: {
        prop: 'checked',
        event: 'checkedChange'
    }
});

new Vue({
  store,
  //  https://github.com/vuejs-templates/webpack-simple/issues/29
  //  creates a root frame element; each frame has its own navigation hierarchy
  render: h => {
    store.commit("load");
    console.log(store.state.firstLoad);
    return h('Frame', [h(store.state.firstLoad ? Welcome : App)])
  }
}).$start();
