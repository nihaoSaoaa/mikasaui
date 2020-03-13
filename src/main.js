import Vue from 'vue'
import App from './App.vue'

import Alert from './components/alert/alert'

Vue.config.productionTip = false

Vue.prototype.$Alert = Alert;

new Vue({
  render: h => h(App),
}).$mount('#app')
