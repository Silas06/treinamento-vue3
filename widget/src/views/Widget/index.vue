<template>
  <teleport to="body">
    <component @openBox="handleOpenBox()" @closeBox="handleCloseBox()"
    :is="state.component" />
  </teleport>
  {{state.component}}
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Standby from './Standby.vue'
import Box from './Box.vue'

type State = {
  component: string
}

interface SetupReturn {
  state: State
  handleCloseBox(): void
  handleOpenBox(): void
}

export default defineComponent({
  components: { Standby, Box },

  setup (): SetupReturn {
    const state = reactive<State>({
      component: 'Standby'
    })

    function handleOpenBox (): void {
      state.component = 'Box'
    }
    function handleCloseBox (): void {
      state.component = 'Standby'
    }
    return {
      state,
      handleCloseBox,
      handleOpenBox
    }
  }
})
</script>
