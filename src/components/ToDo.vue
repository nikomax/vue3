<template>
  <div class="todo-app">
    <div class="todo__input">
      <input type="text" v-model="inputValue">
      <p>{{inputValue}}</p>
    </div>
    <div class="todo__list">
      <to-do-item v-for="item in list" :todo-text="item.title" :key="item.id" :todo-id="item.id" @delete="deleteTodo"/>
    </div>
  </div>
</template>

<script>
import ToDoItem from './ToDoItem'

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
      console.log(id)
    }
  }
}
</script>

<style>

</style>
