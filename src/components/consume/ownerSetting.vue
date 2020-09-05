<template>
    <el-main>
        <el-button type="text" @click="dialogFormVisible = true">新增享受者</el-button>
        <el-dialog title="新增享受者" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="享受者" :label-width="formLabelWidth">
                    <el-input v-model="form.ownerName" autocomplete="off"></el-input>

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
                    prop="ownerName"
                    label="享受者"
                    width="180">
            </el-table-column>


        </el-table>


    </el-main>
</template>

<script>
import ownerSetting from "./ownerSetting.vue"
export default {
        name: "outTable",

        data(){
            return{
                tableData:"",
                time:"",
                form:{
                    ownerName:"",

                },
                formLabelWidth: '120px',
                dialogFormVisible:false,
                createId:[{
                    nickName:"",
                    userId:""
                }],
                ownerName: ""




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
                    url:"/ownerList",

                }).then(result => {
                    console.log(result)
                    this.tableData=result.data.result

                })
            },
            submit:function () {
                this.$ajax({
                    method:"get",
                    url:"/saveOwner",
                    params:{ownerName:this.form.ownerName}
                }).then(result => {

                    if(result.data.success){
                        this.dialogFormVisible=false,

                        this.$message({
                            message: '新增享受着成功',
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