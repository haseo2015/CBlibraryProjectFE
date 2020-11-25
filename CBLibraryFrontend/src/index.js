import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bulma/css/bulma.css'
import './scss/styles.scss'

new Vue({
    router,
    el: '#app',
    render: h => h(App)
  })