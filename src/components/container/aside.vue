<template>

    <el-col :span="18">
        <h5>菜单</h5>
        <el-menu
                default-active="1-1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-edit-outline"></i>
                    <span>记账</span>
                </template>


<!--                <el-submenu index="1-1">-->
<!--                    <template slot="title">录帐</template>-->
<!--                    <el-menu-item index="1-4-1"  route="/index/outTable">账单列表</el-menu-item>-->
<!--                </el-submenu>-->
<!--                <el-menu-item-group title="录帐">-->
                <el-menu-item index="1-1-1"  route="/index/outTable">账单列表</el-menu-item>
                <el-menu-item index="1-1-2"  route="/index/inTable">收入列表</el-menu-item>

                <!--                </el-menu-item-group>-->
            </el-submenu>

            <el-submenu  index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span >图表统计</span>
                </template>
                <el-menu-item index="1-2-1"  route="/index/calender">每日统计</el-menu-item>
                <el-menu-item index="1-2-2"  route="/index/totalStatic">统计总览</el-menu-item>
            </el-submenu>


           <el-submenu index="3">
               <template slot="title">
                   <i class="el-icon-setting"></i>
                   <span slot="title">配置</span>
               </template>
                   <el-menu-item index="1-3-1"  route="/index/ownerSetting">享受者配置</el-menu-item>
                   <el-menu-item index="1-3-2"  route="/index/categorySetting">消费类别配置</el-menu-item>
               <el-menu-item index="1-3-3"  route="/index/payWaySettings">消费渠道配置</el-menu-item>
               <el-menu-item index="1-3-4"  route="/index/cardSetting">银行卡管理</el-menu-item>


           </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
    import outTable from "../consume/outTable";
    import categorySetting from "../consume/categorySetting";
    import totalStatic from "../consume/totalStatic";
    import ownerSetting from "../consume/ownerSetting";
    export default {
        name: "aside",
        components:{outTable,categorySetting,totalStatic}
    }
</script>

<style scoped>

</style>