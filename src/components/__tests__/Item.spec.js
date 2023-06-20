import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import mergeWith from 'lodash.mergewith'
import Item from '../Item.vue'

function customizer(objValue, srcValue) {
  if (Array.isArray(srcValue)) {
    return srcValue
  }

  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue
  }
}

function createWrapper(overrides) {
  const defaultMountingOptions = {
    stubs: {
      RouterLink: RouterLinkStub
    },
    propsData: {
      item: {}
    }
  }
  return shallowMount(
    Item,
    mergeWith(defaultMountingOptions, overrides, customizer)
  )
}

describe('Item.vue', () => {
  test('renders the hostname', () => {
    const item = {
      url: 'https://some-url.com/with-paths'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain('(some-url.com)')
  })

  test('renders item.score', () => {
    const item = {
      score: '10'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.score)
  })

  test('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  test('renders a link to the item.url with item.title as text', () => {
    const item = {
      url: 'http://some-url.com',
      title: 'some-title'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    const a = wrapper.find('a')
    expect(a.text()).toBe(item.title)
    expect(a.attributes().href).toBe(item.url)
  })

  test('renders the time since the last post', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2023')

    dateNow.mockImplementation(() => dateNowTime)

    const item = {
      time: dateNowTime / 1000 - 600
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    dateNow.mockRestore()
    expect(wrapper.text()).toContain('10 minutes ago')
  })

  test('renders correctly', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2023')
    dateNow.mockImplementation(() => dateNowTime)

    const item = {
      by: 'eddyerburgh',
      id: 11122233,
      score: Number(10),
      time: (dateNowTime / 1000) - 600,
      title: 'vue-test-utils is released',
      type: 'story',
      url: 'https://v1.test-utils.vuejs.org/'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    dateNow.mockRestore()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders correctly as job', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2023')
    dateNow.mockImplementation(() => dateNowTime)

    const item = {
      by: 'eddyerburgh',
      id: 11122233,
      score: Number(10),
      time: (dateNowTime / 1000) - 600,
      title: 'vue-test-utils is released',
      type: 'job',
      url: 'https://v1.test-utils.vuejs.org/'
    }

    const wrapper = createWrapper({item})
    dateNow.mockRestore()
    expect(wrapper.element).toMatchSnapshot()
  })
})
