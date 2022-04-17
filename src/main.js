import { createApp } from 'vue'
import router from './router'
import Paginate from "vuejs-paginate-next"
import App from './App.vue'
import './index.css'

createApp(App).use(router).use(Paginate).mount('#app')
