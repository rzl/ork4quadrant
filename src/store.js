import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/axios'
import { getToken, setToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      
    },
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },
  actions: {
    SetToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },

    Login( { commit } , userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        axios.post('/users/login', {
          username: username, 
          password: userInfo.password
        }).then(response => {
          console.log(response)
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    freshUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/users/info', {}).then(response => {
          commit('SET_USER_INFO', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/users/Logout').then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USER_INFO', {})
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
