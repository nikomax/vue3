<template>
  <div class="todo-app">
    <div class="todo__input">
      <input type="text" v-model="inputValue" v-on:keyup.enter="addTodo">
      <p>{{inputValue}}</p>
    </div>
    <div class="todo__list">
      <to-do-item v-for="item in list" :todo-text="item.title" :key="item.id" :todo-id="item.id" @delete="deleteTodo"/>
    </div>
  </div>
</template>

<script>
import ToDoItem from './ToDoItem'
let prevId = 3
export default {
  components: {ToDoItem},
  name: 'ToDo',
  data () {
    return {
      inputValue: '',
      list: [
        {
          id: 1,
          title: 'Купить пожрать'
        },
        {
          id: 2,
          title: 'Пожрать'
        },
        {
          id: 3,
          title: 'Лечь спать'
        }]
    }
  },
  methods: {
    deleteTodo (id) {
      let index = this.list.findIndex(x => x.id === id)
      this.list.splice(index, 1)
    },
    addTodo () {
      prevId++
      this.list.push({id: prevId, title: this.inputValue})
      console.log(prevId)
    }
  }
}
</script>

<style>

</style>
