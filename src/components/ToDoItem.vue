<template>
  <div class="todo-item" :id="todoId">
    {{todoText}}
    <button class="todo-item__remove" @click="deleteTodo">x</button>
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
      type: String,
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

<style lang="sass">
.todo-item
  width: 100%
  align-items: center
  justify-content: space-between
  display: flex
  padding: 10px
  cursor: pointer
  &:nth-child(2n+1)
    background-color: #f1f1f1
  &__remove
    display: block
    background-color: transparent
    border-radius: 3px
    border: 1px solid #132880
    cursor: pointer

</style>
