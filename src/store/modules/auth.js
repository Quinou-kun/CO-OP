import api from '@/api'
import ls from '@/services/ls'

const initialState = {
  connected: false,
  user: {}
}

export default {
  namespaced: true,
  state: {
    connected: false,
    user: {}
  },
  getters: {
    isConnected (state) {
      return state.connected || ls.get('connected')
    },
    getConnectedUser (state) {
      return state.user
    }
  },
  mutations: {
    setConnectedUser (state, u) {
      state.user = u
      state.connected = true
    },
    initState (state) {
      Object.assign(state, initialState)
    }
  },
  actions: {
    login ({commit}, credentials) {
      return api.post('/members/signin', credentials).then(response => {
        ls.set('token', response.data.token)
        commit('setConnectedUser', response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    logout ({commit}, forceDeco) {
      commit('initState')
      ls.remove('token')

      if (forceDeco) {
        api.delete('/members/signout').then(response => {
          commit('initState')
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
