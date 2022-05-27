import { Store } from "vuex"
import { IState } from "@/@types/Alerts"

export class Alert {
	static info(info: any) {
		throw new Error("Method not implemented.")
	}

    constructor(private store: Store<any>) {
        this.store = store
    }

    public info(message: string): void {
        if (message) this.show({
            type: 'info',
            message: message
        })
    }
    public error(message: string): void {
        if (message) this.show({
            type: 'error',
            message: message
        })
    }

    private show(config: IState): void {
        if (config.message) {
            this.store.dispatch('alert/CLEAR_ALERT_TIMEOUT')
            config.id = setTimeout(() => {
                this.store.commit('alert/SET_CONFIG', { show: false })
            }, config.timeout || 3000)

            config.show = true
            this.store.commit('alert/SET_CONFIG', config)
        }
    }
}