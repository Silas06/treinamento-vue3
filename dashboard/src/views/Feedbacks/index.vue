<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col justify-center items-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
        <suspense>
          <template #default>
            <filters
              @select="changeFeedbacksType"
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>

          <template #fallback>
            <filters-loading class="mt-8" />
          </template>
        </suspense>
      </div>

      <div class="col-span-3 px-10 pt-20">
        <p v-if="state.hasError" class="text-lg text-center text-gray-800">
          Aconteceu um erro ao carregar os feedbacks
        </p>
        <p
          v-if="!state.feedbacks.length && !state.isLoading"
          class="text-lg text-center text-gray-800"
        >
          Ainda nenhum feedback recebido
        </p>

        <feedback-card-loading
          v-if="state.isLoading || state.isLoadingFeddbacks"
        />
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />

        <feedback-card-loading
          v-if="state.isLoadingMoreFeedback"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '@/components/HeaderLogged'
import Filters from './Filters'
import FiltersLoading from './FiltersLoading'
import FeedbackCardLoading from '@/components/FeedbackCard/Loading.vue'
import FeedbackCard from '@/components/FeedbackCard'
import { onErrorCaptured, onMounted, onUnmounted, reactive } from 'vue'
import services from '../../sevices'
export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCardLoading,
    FeedbackCard
  },

  setup () {
    const state = reactive({
      isLoading: false,
      isLoadingFeddbacks: false,
      isLoadingMoreFeedback: false,
      hasError: false,
      feedbacks: [],
      pagination: {
        limit: 5,
        offset: 0
      },
      currentFeedbackType: ''
    })

    onErrorCaptured(handleErrors)

    async function changeFeedbacksType (type) {
      try {
        state.isLoadingFeddbacks = true
        state.pagination.limit = 5
        state.pagination.offset = 0
        state.currentFeedbackType = type

        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoadingFeddbacks = false
      } catch (error) {
        handleErrors(error)
      }
    }

    function handleErrors (error) {
      state.isLoading = false
      state.isLoadingFeddbacks = false
      state.isLoadingMoreFeedback = false
      state.hasError = !!error
    }

    onMounted(() => {
      fetchFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    async function handleScroll () {
      const isBottomOfWindow =
        Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
        document.documentElement.scrollHeight

      if (state.isLoading || state.isLoadingMoreFeedback) return
      if (!isBottomOfWindow) return
      if (state.feedbacks.length >= state.pagination.total) return

      try {
        state.isLoadingMoreFeedback = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: (state.pagination.offset + 5)
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }

        state.isLoadingMoreFeedback = false
        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      }
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })
        console.log(data)
        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false
      } catch (error) {
        handleErrors(error)
      }
    }

    return {
      state,
      changeFeedbacksType
    }
  }
}
</script>

<style></style>
