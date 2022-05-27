import { createStore } from 'vuex'
import Emoji from '../json/emojis.json'
import { IEmoji } from '@/@types/Emoji'
import alert from './alert'

export default createStore({
    state: {
        search: '',
        clipboardEmoji: '',
        emojis: [] as IEmoji[]
    },
    getters: {
        GET_SEARCH: state => state.search,
        GET_EMOJIS: (state, getters) => {
            const emojiName = getters['GET_SEARCH'].toLowerCase()
            return state.emojis.filter(({ name }) => {
                const nameEmoji = name.toLowerCase()
                return nameEmoji.indexOf(emojiName) !== -1
            })
        }
    },
    mutations: {
        SET_SEARCH(state, payload) {
            state.search = payload
        },
        SET_EMOJIS(state, payload) {
            state.emojis = payload
        },
        SET_CLIPBOARD_EMOJI(state, payload) {
            state.clipboardEmoji = payload
        }
    },
    actions: {
        async GET_EMOJIS({ commit }) {
            try {
                const data = Emoji
                commit('SET_EMOJIS', data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    modules: {
        alert: alert
    }
})
