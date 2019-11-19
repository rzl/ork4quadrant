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
    CLEAR_INFO: (state) => {
      state.SET_TOKEN = ''
      state.SET_USER_INFO = {}
      removeToken()
    }
  },
  actions: {
    SetToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },

    login( { commit } , userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        axios.post('/users/login', {
          username: username, 
          password: userInfo.password
        }).then(response => {
          const token = response.data
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
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

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/users/Logout').then(() => {
          commit('CLEAR_INFO')
          resolve()
        }).catch(error => {
          commit('CLEAR_INFO')
          reject(error)
        })
      })
    }
  }
})
