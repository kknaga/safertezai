import Vue from 'vue'
import App from '@/app/App.vue'
import router from './router'
import store from './store'
import FirebaseService from '@/services/firebase.service'
import '@/assets/styles/main.scss'

(async () => {
  Vue.config.productionTip = false
  
  await FirebaseService.init()

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
