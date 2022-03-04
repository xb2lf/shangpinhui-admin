import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    if (result.code === 20000) {
      const { data } = result
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      return 'success'
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  },

  // 获取用户信息
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token)
    if (result.code === 20000) {
      const { data } = result
      if (!data) {
        return Promise.reject(new Error('验证失败，请重新登录'))
      }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return data
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  },

  // 退出登录
  async logout({ commit, state }) {
    const result = await logout(state.token)
    if (result.code === 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'success'
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

