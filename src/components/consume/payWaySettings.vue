<template>
    <el-main>
        <el-button type="text" @click="dialogFormVisible = true">新增渠道名称</el-button>
        <el-dialog title="新增渠道名称" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="渠道名称" :label-width="formLabelWidth">
                    <el-input v-model="form.payWayName" autocomplete="off"></el-input>

                </el-form-item>




            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="wayName"
                    label="渠道名称"
                    width="180">
            </el-table-column>


        </el-table>


    </el-main>
</template>

<script>
    import payWaySettings from "./payWaySettings.vue"
    export default {
        name: "outTable",

        data(){
            return{
                tableData:"",
                time:"",
                form:{
                    payWayName:"",

                },
                formLabelWidth: '120px',
                dialogFormVisible:false,
                createId:[{
                    nickName:"",
                    userId:""
                }],
                payWayName: ""




            }
        },
        created() {
            this.getTableData();
            this.loadSelects();
        },
        methods:{
            getTableData:function () {
                this.$ajax({
                    method:"get",
                    url:"/payWayList",

                }).then(result => {
                    console.log(result)
                    this.tableData=result.data.result

                })
            },
            submit:function () {
                this.$ajax({
                    method:"get",
                    url:"/savePayWat",
                    params:{payWayName:this.form.payWayName}
                }).then(result => {

                    if(result.data.success){
                        this.dialogFormVisible=false,

                            this.$message({
                                message: '新增渠道成功',
                                type: 'success'
                            });
                        this.getTableData();
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>