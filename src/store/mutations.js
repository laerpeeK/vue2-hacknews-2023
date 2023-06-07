import Vue from 'vue'

export default {
  setItems: (state, { items }) => {
    state.items = items
  },
  setItem: (state, { item }) => {
    state.item = item
  },
  setComments: (state, { comments }) => {
    comments.forEach((comment) => {
      console.log(comment, 'comment')
      if (comment) {
        Vue.set(state.comments, comment.id, comment)
      }
    })
  },
  setUser: (state, { user }) => {
    state.user = user
  }
}
