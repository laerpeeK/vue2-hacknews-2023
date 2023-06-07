import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import flushPromises from 'flush-promises'
import mergeWith from 'lodash.mergewith'
const localVue = createLocalVue()
localVue.use(Vuex)

function customizer(objValue, srcValue) {
  if (Array.isArray(srcValue)) {
    return srcValue
  }

  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue
  }
}

function createStore(overrides) {
  const defaultStoreConfig = {
    getters: {
      displayItems: jest.fn()
    },
    actions: {
      fetchListData: jest.fn(() => Promise.resolve())
    }
  }
  return new Vuex.Store(mergeWith(defaultStoreConfig, overrides, customizer))
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    stubs: {
      RouterLink: RouterLinkStub
    },
    mocks: {
      $bar: {
        start: jest.fn(),
        finish: jest.fn(),
        fail: jest.fn()
      },
      $route: {
        params: {
          type: 'top'
        }
      }
    },
    localVue,
    store: createStore()
  }
  return shallowMount(
    ItemList,
    mergeWith(defaultMountingOptions, overrides, customizer)
  )
}

describe('ItemList.vue', () => {
  // 采用工厂函数替代beforeEach方案
  // let storeOptions
  // let store
  // beforeEach(() => {
  //   storeOptions = {
  //     getters: {
  //       displayItems: jest.fn()
  //     },
  //     actions: {
  //       fetchListData: jest.fn(() => Promise.resolve())
  //     }
  //   }
  //   store = new Vuex.Store(storeOptions)
  // })

  test('renders an Item with data for each item in displayItems', async () => {
    expect.assertions(4)
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{}, {}, {}]
    // storeOptions.getters.displayItems.mockReturnValue(items)
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({ store })
    // const wrapper = shallowMount(ItemList, {
    //   mocks: { $bar },
    //   localVue,
    //   store
    // })
    const Items = wrapper.findAllComponents(Item)
    await flushPromises()
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  // chapter-11
  test('sets document.title with the capitalized type prop', () => {
    createWrapper({
      mocks: {
        $route: {
          params: {
            type: 'top'
          }
        }
      }
    })
    expect(document.title).toBe('Vue HN | Top')
  })

  // chapter-10
  test('dispatchers fetchListData with $route.params.type', async () => {
    expect.assertions(1)
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())

    const type = 'a type'
    const mocks = {
      $route: {
        params: {
          type
        }
      }
    }
    createWrapper({ store, mocks })
    await flushPromises()
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', { type })
  })

  test('renders 1/5 when on page 1 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.text()).toContain('1/5')
  })

  test('renders 2/5 when on page 2 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    })
    const mocks = {
      $route: {
        params: {
          page: '2'
        }
      }
    }
    const wrapper = createWrapper({ mocks, store })
    expect(wrapper.text()).toContain('2/5')
  })

  test('calls $router.replace when the page parameter is greater than the max page count', async () => {
    expect.assertions(1)
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    })
    const mocks = {
      $route: {
        params: {
          page: '1000'
        }
      },
      $router: {
        replace: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1')
  })

  test('renders a RouterLink with the previous page if one exists', () => {
    const mocks = {
      $route: {
        params: {
          page: '2'
        }
      }
    }

    const wrapper = createWrapper({ mocks })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/top/1')
    expect(wrapper.findComponent(RouterLinkStub).text()).toBe('< prev')
  })

  test('renders a RouterLink with the next page if one exists', () => {
    const store = createStore({
      getters: {
        maxPage: () => 3
      }
    })
    const mocks = {
      $route: {
        params: {
          page: '1'
        }
      }
    }
    const wrapper = createWrapper({ store, mocks })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/top/2')
    expect(wrapper.findComponent(RouterLinkStub).text()).toBe('more >')
  })

  test('renders a routerLink with the next page when no page param exists', () => {
    const store = createStore({
      getters: {
        maxPage: () => 3
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/top/2')
    expect(wrapper.findComponent(RouterLinkStub).text()).toBe('more >')
  })

  test('renders an <a> element without an href if there are no previous pages', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('a').attributes().href).toBe(undefined)
    expect(wrapper.find('a').text()).toBe('< prev')
  })

  test('renders an <a> element without an href if there are no next pages', () => {
    const store = createStore({
      getters: {
        maxPage: () => 1
      }
    })
    const wrapper = createWrapper({ store })

    expect(wrapper.findAll('a').at(1).attributes().href).toBe(undefined)
    expect(wrapper.findAll('a').at(1).text()).toBe('more >')
  })

  // chapter-8

  test('calls $bar start on render', () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    }
    createWrapper({ mocks })
    expect(mocks.$bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load successful', async () => {
    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$bar.finish).toHaveBeenCalled()
  })

  // test('dispatches fetchListData with top', async () => {
  //   const store = createStore()
  //   store.dispatch = jest.fn(() => Promise.resolve())
  //   createWrapper({ store })

  //   await flushPromises()
  //   expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
  //     type: 'top'
  //   })
  // })

  test('calls $bar fail when fetchListData throws', async () => {
    const store = createStore({
      actions: { fetchListData: jest.fn(() => Promise.reject()) }
    })
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })
  // chapter-7
  // test('calls $bar start on load', () => {
  //   const $bar = {
  //     start: jest.fn(),
  //     finish: () => {}
  //   }
  //   shallowMount(ItemList, { mocks: { $bar }, localVue, store })
  //   expect($bar.start).toHaveBeenCalled()
  // })

  // test('calls $bar finish when load successful', async () => {
  //   expect.assertions(1)
  //   const $bar = {
  //     start: () => {},
  //     finish: jest.fn()
  //   }
  //   shallowMount(ItemList, { mocks: { $bar }, localVue, store })
  //   await flushPromises()
  //   expect($bar.finish).toHaveBeenCalled()
  // })

  // test('dispatches fetchListData with top', async () => {
  //   expect.assertions(1)
  //   const $bar = {
  //     start: () => {},
  //     finish: () => {}
  //   }
  //   store.dispatch = jest.fn(() => Promise.resolve())
  //   shallowMount(ItemList, { mocks: { $bar }, localVue, store })
  //   expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
  //     type: 'top'
  //   })
  // })

  // test('calls $bar fail when fetchListData throws', async () => {
  //   expect.assertions(1)
  //   const $bar = {
  //     start: jest.fn(),
  //     fail: jest.fn()
  //   }
  //   storeOptions.actions.fetchListData.mockRejectedValue()
  //   shallowMount(ItemList, { mocks: { $bar }, localVue, store })
  //   await flushPromises()
  //   expect($bar.fail).toHaveBeenCalled()
  // })
})
