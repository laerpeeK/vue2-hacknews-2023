import axios from 'axios'
axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0/'
axios.interceptors.response.use((response) => {
  return response.data
})

function fetch(child) {
  return axios.get(child)
}

export function fetchListData(type) {
  return fetchIdsByType(type).then((ids) => fetchItems(ids))
}

export function fetchIdsByType(type) {
  return fetch(`${type}stories.json`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map((id) => fetchItem(id)))
}

export function fetchItem(id) {
  return fetch(`item/${id}.json`)
}

export function fetchUser(id) {
  return fetch(`user/${id}.json`)
}
