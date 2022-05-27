import { App } from "vue"
import { Alert } from "@/lib/Alert"
import store from "@/store"

export default {
    install: (app: App) => {
        const alert = new Alert(store)
        app.config.globalProperties.$alert = alert
        app.provide('$alert', new Alert(store))
    }
}