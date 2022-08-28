import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import Watable from '../packages/'
createApp(App).use(naive).use(Watable).mount('#app')
