<template>
  <div class="todo">
    <div class="todo__input">
      <input type="text" v-model="inputValue" @keyup.enter="addTodo">
    </div>
    <div class="todo__actions" v-if="keys.length">
      <button class="btn" @click="completeAll">Complete all</button>
      <button class="btn" @click="clearCompleted">Clear completed</button>
    </div>
    <transition-group v-infinite-scroll="loadMore" name="list" tag="div"
                      class="todo__list"
                      v-bind:css="false"
                      v-on:before-leave="beforeLeave"
                      v-on:enter="enter"
                      v-on:leave="leave">
      <to-do-item v-rainbow
                  @changeInput="updTodo"
                  @edit="editTodoItem"
                  :item="$store.state.list[key]"
                  v-for="key in $store.commit('sortTodos')"
                  :key="key" @delete="deleteTodo"
                  @change="changeStatus"/>
    </transition-group>
    <div class="todo__filters" v-if="keys.length">
      <button class="btn" @click="sort='all'">All</button>
      <button class="btn" @click="sort='active'">Active</button>
      <button class="btn" @click="sort='done'">Done</button>
    </div>
  </div>
</template>

<script>
import ToDoItem from './ToDoItem'
import axios from 'axios'
import { TimelineMax } from 'gsap'
import { mapState } from 'vuex'
const listJson = 'https://vuetodo-test.firebaseio.com/list.json'

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
      // list: [],
      // keys: [],
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
    deleteTodo (id) {
      let index = this.keys.findIndex(x => x === id)
      this.keys.splice(index, 1)
      axios.delete(`https://vuetodo-test.firebaseio.com/list/${id}.json`)
    },
    addTodo () {
      if (this.inputValue.length > 0) {
        const newTodoItem = {
          id: ID(),
          title: this.inputValue,
          active: true,
          edit: false
        }
        axios.post(listJson, newTodoItem).then(({data}) => {
          this.list[data.name] = newTodoItem
          this.keys.push(data.name)
        }).catch((error) => {
          alert(error)
        })
        this.inputValue = ''
      }
    },
    changeStatus (id) {
      this.list[id].active = !this.list[id].active
      axios.put(`https://vuetodo-test.firebaseio.com/list/${id}.json`, this.list[id])
    },
    completeAll () {
      let that = this
      this.keys.forEach(function (todoItem) {
        that.list[todoItem].active = false
        axios.put(`https://vuetodo-test.firebaseio.com/list/${todoItem}.json`, that.list[todoItem])
      })
    },
    clearCompleted () {
      let that = this
      this.keys = this.keys.filter((active) => {
        if (that.list[active].active === false) {
          axios.delete(`https://vuetodo-test.firebaseio.com/list/${active}.json`)
          return false
        }
        return true
      })
    },
    editTodoItem (id) {
      this.list[id].edit = true
    },
    updTodo (value, id) {
      if (value.length > 0) {
        this.list[id].title = value
        axios.put(`https://vuetodo-test.firebaseio.com/list/${id}.json`, this.list[id])
      }
      this.list[id].edit = false
    }
  },
  computed: mapState([
    'list', 'keys'
  ])
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
    padding: 20px
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
