import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.scss'

// Mixins
import Title from './mixins/Title'

// Plugins
import AlertsPlugin from './plugins/Alerts'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(AlertsPlugin)
app.mixin(Title)
app.mount('#app')
