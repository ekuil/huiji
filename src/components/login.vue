<template>
    <div>
        <div> {{msg}}</div>
        <el-form >
            <el-input v-model="input1" placeholder="账号" v-bind:class="{input:isinput}"></el-input>
            <el-input v-model="input2" placeholder="密码" :class="{input:isinput}" show-password minlength="6"> </el-input>
            <div> <el-button  type="primary" @click.native.prevent="login">登录</el-button></div>
        </el-form>

    </div>
</template>
<style>
    .input{
        width: 80%;
    }
</style>
<script>
export default {
    name:'login',
   data(){
       return {
        msg:'101 FAMILY',
        input1:"",
        input2:"",
        isinput:true

       }
   },
    methods:{
        login(){
            let userinfo={username:this.input1,password:this.input2}

            this.$ajax({
                method:"get",
                url:"/huiji/login",
                params:userinfo
            }).then(result => {
                if(!result.data.success){
                    this.$message.error(result.data.msg);
                }else{
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    this.goHome()
                }

                }
            )
        },
        goHome:function () {
            // this.$router.push({name: '/login',params:{ id:'1'}});
            window.location.href='/index'
        }
    }
}
</script>