<template>
    <el-main>
    <el-button type="text" @click="dialogFormVisible = true">新建账单</el-button>
        <el-dialog title="新的消费" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="消费者" :label-width="formLabelWidth">
                    <el-select v-model="form.createId" placeholder="谁花的钱">
                    <el-option v-for="item in createId" :key="item.nickName" :label="item.nickName" :value="item.userId"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="享受者" :label-width="formLabelWidth">
                    <el-select v-model="form.ownerId" placeholder="花给谁了">
                        <el-option v-for="item in owner" :key="item.ownerName" :label="item.ownerName" :value="item.ownerId"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.biilname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="消费金额" :label-width="formLabelWidth">
                    <el-input v-model="form.spend" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="消费时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.createTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="消费类别" :label-width="formLabelWidth">
                    <el-select v-model="form.categoryId" placeholder="请选择消费类别">
                        <el-option v-for="item in category" :key="item.categoryName" :label="item.categoryName" :value="item.categoryId"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="支出方式" :label-width="formLabelWidth">
                    <el-select v-model="form.payWay" placeholder="请选择消费类别">
                        <el-option v-for="item in category" :key="item.categoryName" :label="item.categoryName" :value="item.categoryId"/>
                    </el-select>
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
                prop="createId"
                label="消费者"
                width="180">
        </el-table-column>
        <el-table-column
                prop="biilname"
                label="账单名称">
        </el-table-column>
        <el-table-column
                prop="spend"
                label="消费/元"
                width="180">
        </el-table-column>
        <el-table-column
                prop="categoryId"
                label="消费类别">
        </el-table-column>
        <el-table-column
                prop="ownerId"
                label="享受者">
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="消费时间">
        </el-table-column>

    </el-table>


    </el-main>
</template>

<script>
    import addConsume from "./addConsume";
    export default {
        name: "outTable",

        data(){
            return{
                tableData:"",
                time:"",
                form:{
                    biilname:"",
                    createTime:"",
                    createId:"",
                    ownerId:"",
                    categoryId:"",
                    spend:"",
                    payWay:""
                },
                formLabelWidth: '120px',
                dialogFormVisible:false,
                createId:[{
                    nickName:"",
                    userId:""
                }],
                owner:[{
                    ownerId:"",
                    ownerName:""
                }],
                category:[{
                    categoryId:"",
                    categoryName:""
                }],
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },



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
                    url:"/ConsumesList",

                }).then(result => {
                    console.log(result)
                     this.tableData=result.data

                })
            },
            loadSelects:function () {
                this.$ajax({
                    method:"get",
                    url:"/getSelects",

                }).then(result => {
                    console.log(result);
                    this.createId=result.data.result.user
                    this.owner=result.data.result.owner;
                    this.category=result.data.result.categorys
                    console.log(this.form.category)


                })
            },
            submit:function () {
                this.$ajax({
                    method:"get",
                    url:"/Consumesave",
                    params:this.form

                }).then(result => {
                        if(result.data.success){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.dialogFormVisible=false;
                        }


                })
                console.log(this.form);
            }
        }
    }
</script>

<style scoped>

</style>