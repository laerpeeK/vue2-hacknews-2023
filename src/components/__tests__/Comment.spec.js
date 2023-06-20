import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import Comment from '../Comment.vue'
import merge from 'lodash.merge'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

function createStore(overrides) {
  const defaultStoreConfig = {
    state: {
      comments: {
        a1: {
          kids: []
        }
      }
    }
  }
  return new Vuex.Store(merge(defaultStoreConfig, overrides))
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    stubs: {
      RouterLink: RouterLinkStub
    },
    localVue,
    propsData: {
      id: 'a1'
    },
    store: createStore()
  }
  return shallowMount(Comment, merge(defaultMountingOptions, overrides))
}

describe('Comment.vue', () => {
  test('sets router-link to prop using comment.by', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            by: 'edd'
          }
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findAll('.by')).toHaveLength(1)
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/user/edd')
  })

  test('does not render li if comment does not exist in store', () => {
    const store = createStore({
      state: {
        comments: {
          a1: null
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.find('li').exists()).toBe(false)
  })

  test('initially renders open toggle if comment has kids', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.find('.toggle').text()).toContain('[-]')
  })

  test('renders closed toggle after click if comment has kids', async () => {
    expect.assertions(1)
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      stubs: {
        RouterLink: true
      }
    })

    wrapper.find('a').trigger('click')
    await flushPromises()
    expect(wrapper.find('.toggle').text()).toContain('[+] 2 replies collapsed')
  })

  test('does not render toggle if comment has no kids', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.toggle').exists()).toEqual(false)
  })

  test('renders a comment for each kids', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findAllComponents(Comment)).toHaveLength(3)
  })

  test('hides comments when toggle is clicked', async () => {
    expect.assertions(2)
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })

    const wrapper = createWrapper({
      store,
      stubs: {
        RouterLink: true
      }
    })

    wrapper.find('a').trigger('click')
    await flushPromises()
    expect(wrapper.findAllComponents(Comment)).toHaveLength(3)
    expect(wrapper.findAllComponents(Comment).isVisible()).toBeFalsy()
  })
})
