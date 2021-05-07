import Authservice from './auth'
import mockAxios from 'axios'

jest.mock('axios')

describe('teste auth', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve retornar um token quando fizer login', async () => {
    const token = '123.123.122'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await Authservice(mockAxios).login({
      email: 'igor@igor.me',
      password: '123'
    })

    expect(response.data).toHaveProperty('token')
    expect(response).toMatchSnapshot()
  })

  it('retorna o usuario que esta registrado', async () => {
    const user = {
      name: 'Igor',
      password: '123',
      email: 'igor@igor.me'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await Authservice(mockAxios).register(user)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')
    expect(response).toMatchSnapshot()
  })

  it('Erro na request', async () => {
    const errors = { status: 404, statusText: 'Not Found' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await Authservice(mockAxios).login({
      email: 'igor@igor.me',
      password: '123'
    })
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
})
