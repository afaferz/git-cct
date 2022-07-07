import { createStore } from 'vuex';
import MModalGit from '@/components/Modal/MModalGit.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import modalGit from '@/store/modal-git'

const store = createStore({
    modules: {
        modalGit: modalGit
    }
})

describe('Test component MModalGit', () => {
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        wrapper = mount(MModalGit, {
            global: {
                plugins: [store],
                provide: {
                    $alert: jest.fn()
                }
            }
        });
    })
    it('render component', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
})