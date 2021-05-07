<template>
  <div
    @click.prevent="handleToggle"
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800 ">
      {{ feedback.text }}
    </div>

    <div
      v-if="state.isOpen"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Pagina
          </span>
          <span class="font-medium text-gray-700"> {{ feedback.page }} </span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Dispositivo
          </span>
          <span class="font-medium text-gray-700"> {{ feedback.device }} </span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Usuário
          </span>
          <span class="font-medium text-gray-700">
            {{ feedback.fingerprint }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-8" v-if="!state.isOpen">
      <icon name="ChevronDown" size="24" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import Badge from './Badge'
import { getDiffTimeBetweenCurrentDate } from '../../utils/date'
import { reactive } from 'vue'
import palette from '../../../palette'

export default {
  components: { Badge, Icon },
  props: {
    isOpened: { type: Boolean, default: false },
    feedback: { type: Object, required: true }
  },

  setup (props) {
    const state = reactive({
      isOpen: props.isOpened
    })
    function handleToggle () {
      state.isOpen = !state.isOpen
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    }
  }
}
</script>

<style></style>
