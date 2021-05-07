<template>
  <div class="flex justify-between items-center" id="modal-login">
    <h1 class="font-black text-4xl text-gray-800">
      Entre na sua conta
    </h1>

    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form action="" @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-mdium text-gray-800"> Email </span>
        <input
          id="email-field"
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          placeholder="silas@gmail.com"
          v-model="state.email.value"
        />
        <span
          id="email-error"
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-mdium text-gray-800"> Senha </span>
        <input
          id="password-field"
          type="password"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          placeholder="password"
          v-model="state.password.value"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        id="submit-button"
        type="submit"
        :class="{ 'opacity-50': state.isLoading }"
        class="p-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        :disable="state.isLoading"
      >
        <icon name="loading" class="animate-spin" v-if="state.isLoading"/>
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import useModal from '../../hooks/useModal'
import Icon from '@/components/Icon'
import services from '../../sevices'
import {
  validadeEmptyAndLength3,
  validadeEmptyAndEmail
} from '../../utils/validators'
import { useRouter } from 'vue-router'
export default {
  components: { Icon },
  setup () {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validadeEmptyAndEmail
    )
    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validadeEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          state.isLoading = false
          router.push({ name: 'Feedbacks' })
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('E-mail não encontrado')
        }
        if (errors.status === 401) {
          toast.error('E-mail ou senha inválidos')
        }
        if (errors.status === 400) {
          toast.error('Não foi possível fazer a conexão, tente mais tarde')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Não foi possível fazer a conexão, tente mais tarde')
      }
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>

<style></style>
