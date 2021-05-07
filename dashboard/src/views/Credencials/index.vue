<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged></header-logged>
  </div>

  <div class="flex flex-col justify-center items-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>
  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray  ">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é sua chave api
      </p>

      <content-loader
        v-if="store.global.state.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded items-center justify-between bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasErrors"> Erro ao carregar o apiKey </span>
        <span v-else id="apikey"> {{ store.user.currentUser.apiKey }} </span>
        <div class="flex pr-5" v-if="!state.hasErrors">
          <icon
            @click.prevent="haandleCopy"
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />

          <icon
            id="generate-apikey"
            @click.prevent="handleGenerateApiKey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasErrors"> Erro ao carregar o script </span>
        <pre v-else>
&lt;script src="https://Silas06-feedbacker-widget.netlify.app/init.js"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '@/components/HeaderLogged'
import ContentLoader from '@/components/ContentLoader'
import Icon from '@/components/Icon'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import services from '../../sevices'
import { reactive, watch } from 'vue'
import { setApiKey } from '../../store/user'
import { useToast } from 'vue-toastification'

export default {
  components: { HeaderLogged, Icon, ContentLoader },
  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      isLoading: false,
      hasErrors: false
    })

    watch(
      () => store.user.currentUser,
      () => {
        if (!store.global.state.isLoading && !store.user.currentUser.apiKey) {
          handleError(true)
          console.log('silas no watch')
        }
      }
    )

    async function haandleCopy () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.user.currentUser.apiKey)
        toast.success('copiou')
      } catch (error) {
        handleError(error)
      }
    }

    function handleError (error) {
      state.isLoading = false
      state.hasErrors = !!error
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()

        setApiKey(data.apiKey)

        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return { state, store, brandColors: palette.brand, handleGenerateApiKey, haandleCopy }
  }
}
</script>

<style></style>
