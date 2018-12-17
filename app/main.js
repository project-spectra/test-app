import Vue from 'nativescript-vue'
import Vuex from 'vuex';
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import { store } from './store.js'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
Vue.use(Vuex);
// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = (TNS_ENV === 'production')
Vue.config.silent = false;

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
