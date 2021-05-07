import { shallowMount } from '@vue/test-utils'
import HeaderLogged from '.'
import { routes } from '../../router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }

jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  it('teste de renderização do conponent', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Deve mostrar 3 pontos quando não existir usuário logado', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button')

    expect(buttonLogout.text()).toBe('...')
  })

  it('Deve mostrar o nome do usuário logado', async () => {
    router.push('/')
    await router.isReady()
    mockStore.currentUser.name = 'Silas'

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button')

    expect(buttonLogout.text()).toBe('Silas (sair)')
  })
})
