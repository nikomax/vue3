<template>
  <div class="todo">
    <div class="todo__input">
      <input type="text" v-model="inputValue" @keyup.enter="addTodo">
    </div>
    <div class="todo__filters" v-if="$store.state.keys.length">
      <button class="btn" @click="$store.state.sort='all'">All</button>
      <button class="btn" @click="$store.state.sort='active'">Active</button>
      <button class="btn" @click="$store.state.sort='done'">Done</button>
    </div>
    <div class="todo__actions" v-if="$store.state.keys.length">
      <button class="btn" @click="$store.commit('completeAll')">Complete all</button>
      <button class="btn" @click="$store.commit('clearCompleted')">Clear completed</button>
    </div>
    <transition-group v-infinite-scroll="loadMore" name="list" tag="div"
                      class="todo__list"
                      v-bind:css="false"
                      v-on:before-leave="beforeLeave"
                      v-on:enter="enter"
                      v-on:leave="leave">
      <to-do-item v-rainbow
                  @changeInput="updTodo"
                  @edit="$store.commit('editTodoItem', key)"
                  :item="$store.state.list[key]"
                  v-for="key in sortTodos"
                  :key="key" @delete="$store.commit('delete', key)"
                  @change="$store.commit('changeStatus', key)"/>
    </transition-group>

  </div>
</template>

<script>
import ToDoItem from './ToDoItem'
import { TimelineMax } from 'gsap'
import { mapState } from 'vuex'

let ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9)
}
export default {
  components: {ToDoItem},
  name: 'ToDo',
  data () {
    return {
      inputValue: '',
      busy: false
    }
  },
  methods: {
    loadMore: function () {
      let self = this
      self.busy = true
      console.log('loading... ' + new Date())
      setTimeout(function () {
        let app = document.querySelector('.todo__list')
        let height = app.clientHeight
        app.style.height = height + 300 + 'px'
        console.log('end... ' + new Date())
        self.busy = false
      }, 1000)
    },
    beforeLeave: function (el) {
      el.style.position = 'absolute'
    },
    enter: function (el, done) {
      let tl = new TimelineMax({onComplete: done})
      tl.fromTo(el, 0.3, {y: -50, opacity: 0}, {y: 0, opacity: 1})
    },
    leave: function (el, done) {
      let tl = new TimelineMax({onComplete: done})
      tl.fromTo(el, 0.3, {y: 0}, {y: 50, opacity: 0})
    },
    addTodo () {
      if (this.inputValue.length > 0) {
        const newTodoItem = {
          id: ID(),
          title: this.inputValue,
          active: true,
          edit: false
        }
        this.$store.commit('add', newTodoItem)
        this.inputValue = ''
      }
    },
    updTodo (value, id) {
      this.$store.commit('updItem', {value, id})
    }
  },
  computed: {
    ...mapState({
      list: 'list', keys: 'keys', sort: 'sort'
    }),
    sortTodos () {
      let that = this
      let sortedTodo
      if (that.sort === 'all') {
        sortedTodo = that.keys
      } else if (that.sort === 'active') {
        sortedTodo = that.keys.filter(active => that.list[active].active === true)
      } else if (that.sort === 'done') {
        sortedTodo = that.keys.filter(active => that.list[active].active === false)
      }
      return sortedTodo
    }
  },
  created () {
    console.log(this.$store.state.sortedTodo)
    this.$store.dispatch('createList')
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
  &__list
    display: flex
    flex-direction: column
    position: relative
    overflow: hidden
  &__filters
    display: flex
    justify-content: space-between
    padding: 0 20px 20px
  &__actions
    margin-bottom: 20px
    padding: 0 20px
    display: flex
    justify-content: space-between
  /*.list-enter-active, .list-leave-active*/
    /*transition: all 1s*/
  /*.list-enter, .list-leave-to*/
    /*position: absolute*/
    /*opacity: 0*/
    /*transform: translateY(30px)*/
</style>
