<template>
  <component
    :is="store.currentComponent"
    @select-feedback-type="handleSelectFedbackType"
    @next="next"
  />
</template>

<script lang="ts">
import { setFeedbackType, StoreState } from '../../store'
import useStore from '../../hooks/store'
import { defineComponent } from 'vue'
import useNavigation, { Navigation } from '../../hooks/navigation'
import SelectFeedbackType from './SelectFeedbackType.vue'
import Success from './Success.vue'
import ErrorState from './Error.vue'
import WriteAFeedback from './WriteAFeedback.vue'

interface SetupReturn {
  store: StoreState
  handleSelectFedbackType(type: string): void
  next: Navigation['next']
}
export default defineComponent({
  components: {
    SelectFeedbackType,
    Success,
    WriteAFeedback,
    Error: ErrorState
  },
  setup (): SetupReturn {
    const store = useStore()
    const { next } = useNavigation()
    function handleSelectFedbackType (type: string): void {
      setFeedbackType(type)
    }

    return {
      store,
      handleSelectFedbackType,
      next
    }
  }
})
</script>

<style></style>
