import { createApp } from 'vue'
import PlayGround from './views/PlayGround/index.vue'
import App from './App.vue'
import { setup } from './utils/bootstrap'

import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'
import 'animate.css'

setup({
  onProduction: () => {
    createApp(App).mount('#app')
  },
  onDevelopment: () => {
    createApp(PlayGround).mount('#app')
  }
})
