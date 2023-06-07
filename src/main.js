import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App'
import ProgressBar from './components/ProgressBar.vue'
import storeConfig from './store/store-config'
import routerConfig from './router/router-config'
import { titleMixin } from './util/mixins'
import { timeAgo, host } from './util/filters'

Vue.use(Vuex)
Vue.use(Router)
Vue.config.productionTip = false

const store = new Vuex.Store(storeConfig)
const router = new Router(routerConfig)
sync(store, router)

const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar

document.body.appendChild(bar.$el)
Vue.mixin(titleMixin)
Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
