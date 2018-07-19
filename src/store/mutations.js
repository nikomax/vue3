const mutations = {
  getList (state, data) {
    state.list = data
    state.keys = Object.keys(state.list)
  }
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
  // }
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
