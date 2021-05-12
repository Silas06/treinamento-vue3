<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'
import Chat from './Chat.vue'
import Back from './Back.vue'
import Close from './Close.vue'
import Error from './Error.vue'
import Success from './Success.vue'

export default {
  components: { Loading, Copy, ChevronDown, Chat, Close, Back, Success, Error },
  props: {
    name: { type: String, required: true }
  }
}
</script>
