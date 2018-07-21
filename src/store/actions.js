import axios from 'axios'
const listJson = 'https://vuetodo-test.firebaseio.com/list.json'
const actions = {
  createList ({state, commit}) {
    axios.get(listJson)
      .then(function (response) {
        commit('getList', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export default actions
