<template>
    <div>
        {{msg}}
        用户名:<input type="text">
        密码:<input type="password">
        <button @click.native..prevent="login" >登录</button>
    </div>
</template>
<script>
export default {
    name:'login',
   data(){
       return {
        msg:'--------------------系统'
       }
   },
    methods:{
        login(){

        }
    }
}
</script>