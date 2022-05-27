import { Module } from 'vuex';
import { createStore } from 'vuex'
import Emoji from '../json/emojis.json'
import { IState } from '@/@types/Alerts'

const alert: Module<any, any> = {
    namespaced: true,
    state: {
        show: false,
        message: '',
        type: 'info',
        id: 0
    } as IState,
    getters: {

    },
    mutations: {
        SET_CONFIG(state, payload) {
            state.show = payload.show
            state.message = payload.message
            state.type = payload.type
            state.id = payload.id
        },
    },
    actions: {
        CLEAR_ALERT_TIMEOUT({ state }) {
            if (state.id) clearTimeout(state.id)
        }
    },
}

export default alert