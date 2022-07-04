import { defineStore } from 'pinia'
import { validToken } from '../utils/validToken'
import TokenService from '../services/TokenService'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    access: TokenService.getLocalAccessToken(),
    logged: false
  }),
  getters: {
    loggedIn() {
      return this.logged
    }
  },
  actions: {
    checkLoggedIn() {
      validToken().then(value => this.logged = value)
    },
    logoutUser() {
      TokenService.removeToken()
      this.logged = false
    }
  }
})