import { fetchItems, fetchListData, fetchUser, fetchItem } from '../api/api'
export default {
  fetchListData({ commit }, { type }) {
    return fetchListData(type).then((items) => commit('setItems', { items }))
  },
  fetchComments({ commit, dispatch }, { item }) {
    if (!item) {
      return
    }
    return fetchItems(item.ids || []).then((comments) => {
      commit('setComments', { comments })
      return Promise.all(
        comments.map((item) => dispatch('fetchComments', { item }))
      )
    })
  },
  fetchItem({ commit }, { id }) {
    return fetchItem(id).then((item) => commit('setItem', { item }))
  },
  fetchUser({ commit }, { id }) {
    return fetchUser(id).then((user) => commit('setUser', { user }))
  }
}
