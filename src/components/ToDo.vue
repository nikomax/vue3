<template>
  <div class="todo">
    <div class="todo__input">
      <input type="text" v-model="inputValue" v-on:keyup.enter="addTodo">
    </div>
    <div class="todo__list">
      <to-do-item v-for="item in list" :todo-text="item.title" :key="item.id" :todo-id="item.id" @delete="deleteTodo"/>
    </div>
  </div>
</template>

<script>
import ToDoItem from './ToDoItem'
let ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9)
}
export default {
  components: {ToDoItem},
  name: 'ToDo',
  data () {
    return {
      inputValue: '',
      list: [
        {
          id: '1',
          title: 'Buy meal'
        },
        {
          id: '2',
          title: 'Eat'
        },
        {
          id: '3',
          title: 'Go to the bed'
        }]
    }
  },
  methods: {
    deleteTodo (id) {
      let index = this.list.findIndex(x => x.id === id)
      this.list.splice(index, 1)
    },
    addTodo () {
      this.list.push({id: ID(), title: this.inputValue})
      this.inputValue = ''
    }
  }
}
</script>

<style lang="sass">
*
  box-sizing: border-box

body
  background-color: #fff

.todo
  box-shadow: 0 0 5px rgba(0,0,0,0.5)
  width: 300px
  background-color: #fff
  margin: 0 auto
  padding: 20px 0
  text-align: left
  border-radius: 5px
  &__input
    padding: 0 20px
    width: 100%
    height: 30px
    margin-bottom: 30px
    input
      padding: 0 10px
      display: block
      height: 100%
      width: 100%
      border: none
      box-shadow: 0 1px 3px rgba(0,0,0,0.5)
      border-radius: 5px
</style>
