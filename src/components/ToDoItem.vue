<template>
  <div class="todo-item" :id="todoId">
    {{todoText}}
    <button @click="deleteTodo">x</button>
  </div>
</template>

<script>
export default {
  name: 'toDoItem',
  props: {
    todoText: {
      type: String,
      required: true
    },
    todoId: {
      type: Number,
      required: true
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('delete', this.todoId)
    }
  }
}
</script>

<style scoped>

</style>
