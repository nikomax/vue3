import axios from 'axios'
const listJson = 'https://vuetodo-test.firebaseio.com/list.json'
const mutations = {
  getList (state, data) {
    state.list = data
    state.keys = Object.keys(state.list)
  },
  changeStatus (state, id) {
    state.list[id].active = !state.list[id].active
    axios.put(`https://vuetodo-test.firebaseio.com/list/${id}.json`, state.list[id])
  },
  delete (state, id) {
    let index = state.keys.findIndex(x => x === id)
    state.keys.splice(index, 1)
    axios.delete(`https://vuetodo-test.firebaseio.com/list/${id}.json`)
  },
  add (state, item) {
    axios.post(listJson, item).then(({data}) => {
      state.list[data.name] = item
      state.keys.push(data.name)
    }).catch((error) => {
      alert(error)
    })
  },
  clearCompleted (state) {
    state.keys = state.keys.filter((active) => {
      if (state.list[active].active === false) {
        axios.delete(`https://vuetodo-test.firebaseio.com/list/${active}.json`)
        return false
      }
      return true
    })
  },
  updItem (state, payload) {
    if (payload.value.length > 0) {
      state.list[payload.id].title = payload.value
      axios.put(`https://vuetodo-test.firebaseio.com/list/${payload.id}.json`, state.list[payload.id])
    }
    state.list[payload.id].edit = false
  },
  editTodoItem (state, id) {
    state.list[id].edit = true
  },
  completeAll (state) {
    state.keys.forEach(function (todoItem) {
      state.list[todoItem].active = false
      axios.put(`https://vuetodo-test.firebaseio.com/list/${todoItem}.json`, state.list[todoItem])
    })
  }
}
// const mutations = {
//   increment(state) {
//     state.counter++
//   },
//   decrement(state) {
//     state.counter--
//   },
// }

export default mutations
