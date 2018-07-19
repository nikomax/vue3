import axios from 'axios'
const listJson = 'https://vuetodo-test.firebaseio.com/list.json'
const actions = {
  createList ({state, commit}) {
    console.log(state)
    console.log('asfd')
    axios.get(listJson)
      .then(function (response) {
        commit('getList', response.data)
        // state.list = response.data
        // console.log(state.list)
        // state.keys = Object.keys(commit(state.list))
        // console.log(Object.keys(that.list))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export default actions
