<template>

    <el-col :span="12">
        <h5>菜单</h5>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose" router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>记账</span>
                </template>


<!--                <el-submenu index="1-1">-->
<!--                    <template slot="title">录帐</template>-->
<!--                    <el-menu-item index="1-4-1"  route="/index/outTable">账单列表</el-menu-item>-->
<!--                </el-submenu>-->
<!--                <el-menu-item-group title="录帐">-->
                                        <el-menu-item index="1-4-1"  route="/index/outTable">账单列表</el-menu-item>
<!--                </el-menu-item-group>-->
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">图表</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">配置</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>

<script>
    import outTable from "../consume/outTable";
    export default {
        name: "aside",
        components:{outTable}
    }
</script>

<style scoped>

</style>