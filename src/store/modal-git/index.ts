import { Module } from 'vuex';

const modalGit: Module<any, any> = {
    namespaced: true,
    state: {
        open: false,
        message: '',
        commit: {
            patters: '',
            emoji: ''
        }
    },
    getters: {
        GET_MESSAGE: state => state.message,
        GET_COMMIT: state => state.commit,
        GET_OPEN: state => state.open
    },
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload
        },
        SET_COMMIT(state, payload) {
            state.commit = payload
        },
        SET_OPEN(state, payload) {
            state.open = payload
        }
    },
}

export default modalGit