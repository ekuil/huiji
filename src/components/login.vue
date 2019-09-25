<template>
    <div>
        {{msg}}
        <el-input v-model="a" placeholder="账号"></el-input>
        <el-input v-model="b" placeholder="密码"></el-input>
      <el-button  type="primary" @click.native.prevent="login">登录</el-button>
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
            let uinfo={u:this.a,p:this.b}
            alert("33"+uinfo)
        }
    }
}
</script>