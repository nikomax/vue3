<template>
  <div class="todo-item" :id="todoId" :class="{'is-done': !active, 'is-edit': edit}">
    <input class="todo-item__input" type="text" @keyup.enter="updateTodo">
    <div class="todo-item__text"  @click="changeStatus" @dblclick="editTodo">
      {{todoText}}
    </div>
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
    },
    active: {
      type: Boolean
    },
    edit: {
      type: Boolean
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('delete', this.todoId)
    },
    changeStatus () {
      this.$emit('change', this.todoId)
    },
    editTodo () {
      this.$emit('edit', this.todoId)
    },
    updateTodo (e) {
      this.$emit('changeInput', e.target.value, this.todoId)
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
  position: relative
  cursor: pointer
  transition: all 1s
  &:nth-child(2n+1)
    background-color: #f1f1f1
  &.is-done
    .todo-item__text
      text-decoration: line-through
  &.is-edit
    .todo-item__input
      display: block
    .todo-item__text
      display: none
  &__input
    display: none
    margin: 5px 10px
    padding: 5px
  &__text
    flex-grow: 1
    padding: 10px
  &__remove
    position: absolute
    top: 50%
    right: 10px
    transform: translateY(-50%)
    display: block
    background-color: transparent
    border-radius: 3px
    border: 1px solid #132880
    cursor: pointer

</style>
