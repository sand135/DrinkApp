import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store';

import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  created(){
    //fetches all drinks when app is starting up
    this.$store.dispatch('fetchAllAlcoholicDrinks')
    this.$store.dispatch('fetchAllNonAlcoholicDrinks')
  },

  store,
  render: h => h('frame', [h(App)])
}).$start()
