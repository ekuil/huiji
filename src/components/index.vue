<template>
   <el-container>
        <el-header>
            <topNav></topNav>
        </el-header>

       <el-container>

           <el-aside>
               <leftMenu></leftMenu>
           </el-aside>

           <el-main>
               <div>
                   <router-view></router-view>
               </div>
           </el-main>

       </el-container>


   </el-container>

</template>

<script>
    import topNav from "./container/topNav";
    import leftMenu from "./container/aside";
    export default {
        name: "index",
        components:{topNav,leftMenu}
    }
</script>

<style scoped>

</style>