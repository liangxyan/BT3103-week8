import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'  //Step1
import Routes from './routes' //step4

Vue.config.productionTip = false
Vue.use(VueRouter) //Step2

const myRouter = new VueRouter({
  routes: Routes,
  mode: "history"
})

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')
