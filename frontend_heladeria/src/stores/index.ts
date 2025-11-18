import { defineStore } from 'pinia'
import { getTokenFromLocalStorage } from '@/helpers'
import http from '@/plugins/axios'
import router from '@/router'

const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: localStorage.getItem('userId') || '',
    user: localStorage.getItem('user') || '',
    token: getTokenFromLocalStorage(),
    returnUrl:''
  }),
  getters: {},
  actions: {
    async login(usuario: string, clave: string) {
      await http.post('auth/login', { usuario, clave }).then((response) => {
        this.userId = response.data.id
        this.user = response.data.usuario
        this.token = response.data.access_token

        localStorage.setItem('userId', this.userId || '')
        localStorage.setItem('user', this.user || '')
        localStorage.setItem('token', this.token || '')

        router.push(this.returnUrl || '/')
      })
    },
    logout() {
      localStorage.clear()
      this.$reset()
      router.push('/')
    }
  }
})

export { useAuthStore }
