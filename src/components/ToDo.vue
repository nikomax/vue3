<template>
  <div class="todo">
    <div class="todo__input">
      <input type="text" v-model="inputValue" @keyup.enter="addTodo">
    </div>
    <div class="todo__actions" v-if="list.length">
      <button class="btn" @click="completeAll">Complete all</button>
      <button class="btn" @click="clearCompleted">Clear completed</button>
    </div>
    <div class="todo__list">
      <to-do-item @changeInput="updTodo" @edit="editTodoItem" :edit="item.edit" :active="item.active" v-for="item in sortTodos" :todo-text="item.title" :key="item.id" :todo-id="item.id" @delete="deleteTodo" @change="changeStatus"/>
    </div>
    <div class="todo__filters" v-if="list.length">
      <button class="btn" @click="sort='all'">All</button>
      <button class="btn" @click="sort='active'">Active</button>
      <button class="btn" @click="sort='done'">Done</button>
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
      sort: 'all',
      list: [
        {
          id: '1',
          title: 'Buy meal',
          active: true,
          edit: false
        },
        {
          id: '2',
          title: 'Eat',
          active: true,
          edit: false
        },
        {
          id: '3',
          title: 'Go to the bed',
          active: true,
          edit: false
        }]
    }
  },
  methods: {
    deleteTodo (id) {
      let index = this.list.findIndex(x => x.id === id)
      this.list.splice(index, 1)
    },
    addTodo () {
      if (this.inputValue.length > 0) {
        this.list.push({id: ID(), title: this.inputValue, active: true, edit: false})
        this.inputValue = ''
      }
    },
    changeStatus (id) {
      let index = this.list.findIndex(x => x.id === id)
      this.list[index].active = !this.list[index].active
    },
    completeAll () {
      this.list.forEach(function (todoItem) {
        todoItem.active = false
      })
    },
    clearCompleted () {
      this.list = this.list.filter(active => active.active === true)
    },
    editTodoItem (id) {
      let index = this.list.findIndex(x => x.id === id)
      this.list[index].edit = true
    },
    updTodo (value, id) {
      let index = this.list.findIndex(x => x.id === id)
      if (value.length > 0) {
        this.list[index].title = value
      }
      this.list[index].edit = false
    }
  },
  computed: {
    sortTodos: function () {
      let sortedTodo
      if (this.sort === 'all') {
        sortedTodo = this.list
      } else if (this.sort === 'active') {
        sortedTodo = this.list.filter(active => active.active === true)
      } else if (this.sort === 'done') {
        sortedTodo = this.list.filter(active => active.active === false)
      }
      return sortedTodo
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
  padding: 20px 0 10px
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
  &__filters
    display: flex
    justify-content: space-between
    padding: 20px
  &__actions
    margin-bottom: 20px
    padding: 0 20px
    display: flex
    justify-content: space-between
</style>
