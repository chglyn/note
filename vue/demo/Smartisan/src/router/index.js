import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoList from '@/components/TodoList'
import TodoItem from '@/components/TodoItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/todolist/:id',
    	name: 'TodoList',
    	component: TodoList
    },
    {
    	path: '/list',
    	name: 'TodoItem',
    	component: TodoItem
    }
  ]
})
