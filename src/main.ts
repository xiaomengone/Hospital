import { createApp } from 'vue'
import pinia from '@/stores'
import App from './App.vue'
import router from '@/router'
import 'virtual:svg-icons-register'

// import '@/assets/main.css'
import '@/styles/main.scss'
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
