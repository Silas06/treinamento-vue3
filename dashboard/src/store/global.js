import { reactive } from 'vue'

const state = reactive({
  isLoading: false
})

export default { state }

export function setGloballoading (status) {
  state.isLoading = status
}
