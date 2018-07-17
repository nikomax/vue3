const mutations = {
  // sortTodos (state) {
  //   let that = state
  //   let sortedTodo
  //   if (this.sort === 'all') {
  //     sortedTodo = this.keys
  //   } else if (this.sort === 'active') {
  //     sortedTodo = this.keys.filter(active => that.list[active].active === true)
  //   } else if (this.sort === 'done') {
  //     sortedTodo = this.keys.filter(active => that.list[active].active === false)
  //   }
  //   return sortedTodo
  // },
  created (state) {
    const listJson = 'https://vuetodo-test.firebaseio.com/list.json'
    console.log('asfd')
    axios.get(listJson)
      .then(function (response) {
        state.list = response.data
        console.log(state.list)
        state.keys = Object.keys(state.list)
        // console.log(Object.keys(that.list))
    })
    .catch(function (error) {
      console.log(error)
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
