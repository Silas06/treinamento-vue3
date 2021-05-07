import axios from 'axios'
import AuthService from './auth'
import UsersService from './users'
import router from '../router'
import { setGloballoading } from '../store/global'
import feedbacksServices from './feedbaacks'

const API_ENVS = {
  production: 'https://backend-treinamento-vue3-pi.vercel.app',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.eventNames.NODE_ENV] ?? API_ENVS.local
})

httpClient.interceptors.response.use(
  response => {
    setGloballoading(false)
    return response
  },
  error => {
    const canThrowAnError =
      error.request.status === 0 || error.request.status === 500

    if (canThrowAnError) {
      setGloballoading(false)
      throw new Error(error.message)
    }

    if (error.request.status === 401) {
      router.push({ name: 'Home' })
    }

    setGloballoading(false)
    return error
  }
)

httpClient.interceptors.request.use(config => {
  setGloballoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: feedbacksServices(httpClient)
}
