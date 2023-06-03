import { shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'
import flushPromises from 'flush-promises'
describe('ProgressBar.vue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  test('displays the bar when start is called', async () => {
    expect.assertions(2)
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden')
    await wrapper.vm.start()
    expect(wrapper.classes()).not.toContain('hidden')
  })

  test('sets the bar to 100% width when finish is called', async () => {
    expect.assertions(1)
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    await wrapper.vm.finish()
    expect(wrapper.element.style.width).toBe('100%')
  })

  test('resets to 0% width when start is called', async () => {
    expect.assertions(1)
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.finish()
    await wrapper.vm.start()
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('increases width by 1% every 100ms after start call', async () => {
    expect.assertions(3)
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    await jest.advanceTimersByTime(100)
    expect(wrapper.element.style.width).toBe('1%')
    await jest.advanceTimersByTime(900)
    expect(wrapper.element.style.width).toBe('10%')
    await jest.advanceTimersByTime(4000)
    expect(wrapper.element.style.width).toBe('50%')
  })

  test('clears timer when finish is called', async () => {
    expect.assertions(1)
    const spy = jest.spyOn(window, 'clearInterval')
    const wrapper = shallowMount(ProgressBar)
    await wrapper.vm.start()
    await wrapper.vm.finish()
    expect(spy).toHaveBeenCalled()
  })

  test('add error class when fail is called', async () => {
    expect.assertions(1)
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    await flushPromises()

    expect(wrapper.classes()).toContain('error')
  })

  test('sets the bar to 100% width when fail is called', async () => {
    expect.assertions(1)
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    await flushPromises()
    expect(wrapper.element.style.width).toBe('100%')
  })
})
