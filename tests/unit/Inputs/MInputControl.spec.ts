import MInputControl from '../../../src/components/Inputs/MInputControl.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { createStore } from 'vuex';


const store = createStore({
    state() {
        return {
            search: '',
            clipboardEmoji: '',
        }
    },
    mutations: {
        SET_SEARCH(state: any, payload) {
            state.search = payload
        },
    },
    getters: {
        GET_SEARCH: state => state.search,
    }
})


describe('Test component MInputControl', () => {
    let wrapper: VueWrapper<any>;
    const spyOnCommit = jest.spyOn(store, 'commit')
    beforeEach(() => {
        wrapper = mount(MInputControl, {
            global: {
                plugins: [store]
            }
        })
    })
    it('render component', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('test ref input', async () => {
        const inputControl = wrapper.vm.inputControl
        const inputDOM = wrapper.find('[data-jest="input-search"]')

        // To be an input element
        expect(typeof inputControl).toBe(typeof inputDOM)
    })
    it('test focus in input with command ctrl + i', async () => {
        const { mockSearchKeyFn, mockConsoleLog, inputControlFocus } = testSearchKey()
        const windowEventListenerMock = jest.spyOn(window, 'addEventListener')
        const keyboardEventWithCtrl = new KeyboardEvent('keydown', { key: 'i', ctrlKey: true })

        // Set event with ctrl + i
        window.addEventListener('keydown', mockSearchKeyFn)
        window.dispatchEvent(keyboardEventWithCtrl)

        expect(windowEventListenerMock).toHaveBeenCalledWith('keydown', mockSearchKeyFn)
        expect(mockConsoleLog).toHaveBeenCalledWith('CTRL + i have been called OK!')
        expect(inputControlFocus).toHaveBeenCalledTimes(1)

        // Set event without ctrl key pressed
        const keyboardEventWithoutCtrl = new KeyboardEvent('keydown', { key: 'i', ctrlKey: false })
        window.addEventListener('keydown', mockSearchKeyFn)
        window.dispatchEvent(keyboardEventWithoutCtrl)

        expect(windowEventListenerMock).toHaveBeenCalledWith('keydown', mockSearchKeyFn)
        expect(inputControlFocus).toHaveBeenCalledTimes(1)

        jest.restoreAllMocks()

    })
    it('test focus in input without command ctrl + i', async () => {
        const { mockSearchKeyFn, mockConsoleLog, inputControlFocus } = testSearchKey()
        const windowEventListenerMock = jest.spyOn(window, 'addEventListener')

        // Set event without ctrl key pressed
        const keyboardEventWithoutCtrl = new KeyboardEvent('keydown', { key: 'i', ctrlKey: false })
        window.addEventListener('keydown', mockSearchKeyFn)
        window.dispatchEvent(keyboardEventWithoutCtrl)

        expect(windowEventListenerMock).toHaveBeenCalledWith('keydown', mockSearchKeyFn)
        expect(mockConsoleLog).toHaveBeenCalledWith('CTRL + i not have been called!')
        expect(inputControlFocus).not.toHaveBeenCalled()

    })
    it('test user interaction with input', async () => {
        const input = wrapper.find('[data-jest="input-search"]')
        expect(wrapper.vm.search).toEqual('')

        await input.setValue('test')

        expect(wrapper.vm.search).toEqual('test')
    })
})

function testSearchKey() {
    const mockConsoleLog = jest.spyOn(console, 'log')

    const inputControlFocus = jest.fn()

    const mockSearchKeyFn = jest.fn().mockImplementation((event) => {
        const { ctrlKey, key } = event;

        if (ctrlKey && key === "i") {
            event.preventDefault();
            console.log('CTRL + i have been called OK!')

            event.stopPropagation();
            return inputControlFocus()
        }
        console.log('CTRL + i not have been called!')
    })
    return {
        mockSearchKeyFn, inputControlFocus, mockConsoleLog
    }
}