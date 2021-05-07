import useStore from '../hooks/useStore'
import { setCurrentUser, resetUserStore, setApiKey, clearCurrentUser } from './user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })
  it('setar usuario atual', () => {
    const store = useStore()
    setCurrentUser({ name: 'Igor' })
    expect(store.user.currentUser.name).toBe('Igor')
  })

  it('Mostrar a apikey do usuário atual', () => {
    const store = useStore()
    setApiKey('123')
    expect(store.user.currentUser.apiKey).toBe('123')
  })

  it('limpar usuário aatual', () => {
    const store = useStore()
    setCurrentUser({ name: 'Igor' })
    expect(store.user.currentUser.name).toBe('Igor')
    clearCurrentUser()

    expect(store.user.currentUser.name).toBeFalsy()
  })
})
