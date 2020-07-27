<template>
    <div>
        {{msg}}
        <el-input v-model="input1" placeholder="账号"></el-input>
        <el-input v-model="input2" placeholder="密码" show-password minlength="6"> </el-input>
      <el-button  type="primary" @click.native.prevent="login">登录</el-button>
    </div>
</template>
<script>
export default {
    name:'login',
   data(){
       return {
        msg:'101 FAMILY',
        input1:"",
        input2:""

       }
   },
    methods:{
        login(){
            let userinfo={username:this.input1,password:this.input2}
            this.$ajax({
                method:"get",
                url:"/huiji/login",
                pramas:userinfo
            }).then(result => {console.log(result.data.msg)}
            )


        }
    }
}
</script>