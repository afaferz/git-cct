import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.scss'

// Plugins
import AlertsPlugin from './plugins/Alerts'
import { Alert } from './lib/Alert'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(AlertsPlugin)
app.mount('#app')
