import { reactive, readonly } from 'vue'

export type StoreState = {
  currentComponent: string
  feedbackType: string
  message: string
  apikey: string
  fingerprint: string
  currentPage: string
}

const initialState: StoreState = {
  // currentComponent: 'SelectFeedbackType',
  currentComponent: 'Error',
  feedbackType: '',
  message: '',
  fingerprint: '',
  apikey: '',
  currentPage: ''
}

const state = reactive<StoreState>({ ...initialState })

export function setCurrentComponent (component: string): void {
  state.currentComponent = component
}

export function setMessage (message: string): void {
  state.message = message
}

export function setFeedbackType (type: string): void {
  state.feedbackType = type
}

export function setCurrentPage (page: string): void {
  state.currentPage = page
}

export function setApikey (apikey: string): void {
  state.apikey = apikey
}

export function serFingerprint (fingerprint: string): void {
  state.fingerprint = fingerprint
}

export function resetStore (): void {
  setCurrentComponent(initialState.currentComponent)
  setMessage(initialState.message)
  setApikey(initialState.apikey)
  setFeedbackType(initialState.feedbackType)
  serFingerprint(initialState.fingerprint)
  setCurrentPage(initialState.currentPage)
}

export default readonly(state)
