// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Імпортуємо стилі
import './styles/main.scss'

// ІМПОРТУЄМО JS BOOTSTRAP (достатньо імпортувати це, воно само все підтягне)
import 'bootstrap' 

const app = createApp(App)
app.use(router)
app.mount('#app')