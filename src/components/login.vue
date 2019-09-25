<template>
    <div>
        {{msg}}
        用户名:<input type="text">
        密码:<input type="password">
    </div>
</template>
<script>
export default {
    name:'login',
   data(){
       return {
        msg:'--------------------系统'
       }
   }
}
</script>