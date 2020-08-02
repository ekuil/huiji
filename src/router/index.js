import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import  home from '@/components/home'
import  index from '@/components/index'
import aside from "../components/container/aside";
import topNav from "../components/container/topNav";
import outTable from "../components/consume/outTable";
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path: '/index',
      name:'index',
      component: index,
      meta:{
        title:"系统导航",
        levelList:[]
      },
      children:[
        {
          path:"/index/outTable",
          name:"outTable",
          component:outTable
        }
      ]
    }
  ]
})
