<template>
  <div class="flex justify-between items-center" id="modal_create_account">
    <h1 class="font-black text-4xl text-gray-800">
      Crie uma conta
    </h1>

    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form action="" @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-mdium text-gray-800"> Nome </span>
        <input
          type="text"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          placeholder="Silas"
          v-model="state.name.value"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-mdium text-gray-800"> Email </span>
        <input
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:outline-none"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          placeholder="silas@gmail.com"
          v-model="state.email.value"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-mdium text-gray-800"> Senha </span>
        <input
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
        type="submit"
        :class="{ 'opacity-50': state.isLoading }"
        class="p-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        :disable="state.isLoading"
      >
        <icon name="loading" class="animate-spin" v-if="state.isLoading" />
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

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      'password',
      validadeEmptyAndLength3
    )

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
      },
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      }
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password })
      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }
      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true

        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
          return
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao cria a conta, tente novamente mais tarde!')
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
