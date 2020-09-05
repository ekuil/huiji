import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import  home from '@/components/home'
import  index from '@/components/index'
import aside from "../components/container/aside";
import topNav from "../components/container/topNav";
import outTable from "../components/consume/outTable";
import categorySetting from "../components/consume/categorySetting";
import ownerSetting from "../components/consume/ownerSetting";
import payWaySettings from "../components/consume/payWaySettings";
import cardSetting from "../components/consume/cardSetting";
import inTable from "../components/consume/inTable";
import calender from "../components/consume/calender";
import totalStatic from "../components/consume/totalStatic";
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
      path:'/',
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
          path:"/index/inTable",
          name:"inTable",
          component:inTable
        },
        {
          path:"/index/outTable",
          name:"outTable",
          component:outTable
        },{
          path:"/index/categorySetting",
          name:"categorySetting",
          component:categorySetting
        },
        {
          path:"/index/ownerSetting",
          name:"ownerSetting",
          component:ownerSetting
        },
        {
          path:"/index/payWaySettings",
          name:"payWaySettings",
          component:payWaySettings
        },
        {
          path:"/index/cardSetting",
          name:"cardSetting",
          component:cardSetting
        },
        {
          path:"/index/calender",
          name:"calender",
          component:calender
        },
        {
        path:"/index/totalStatic",
        name:"totalStatic",
        component:totalStatic
        }
      ]
    }
  ]
})
