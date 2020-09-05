<template>
    <el-main>
        <el-button type="text" @click="dialogFormVisible = true">新的收入</el-button>
        <el-dialog title="新的收入" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules"  ref="form">

                <el-form-item label="选择卡" :label-width="formLabelWidth" prop="spend">
                    <el-select v-model="form.cardId" placeholder="哪个卡的钱">
                        <el-option v-for="item in bankCard" :key="item.cardName" :label="item.cardName" :value="item.id"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="收入" :label-width="formLabelWidth" prop="categoryId">
                    <el-input v-model="form.earn" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item label="收入时间" :label-width="formLabelWidth" >
                    <el-date-picker
                            v-model="form.createTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth" prop="cardId">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="form.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>

        </el-dialog>


        <el-table
                :data="tableDatas"
                style="width: 100%">
            <el-table-column
                    prop="cardName"
                    label="卡号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="earn"
                    label="收入">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="收入时间"
                    width="180">
            </el-table-column>
        </el-table>
    </el-main>

</template>

<script>
    import inTable from "./inTable.vue"
    export default {
        name: "inTable",
        data(){
            return{
                tableDatas:"",
                form:{
                    remark:"",
                    earn:"",
                    cardId:"",
                    createTime:""
                },
                rules:"",
              formLabelWidth: '100px',
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
                dialogFormVisible:false,
                bankCard:""

            }
        },
        created() {
            this.getTableData();
            this.getSelect();
        },
        methods:{
            getTableData:function () {
                this.$ajax({
                    method:"get",
                    url:"/incomeList",

                }).then(result => {
                    console.log(result.data.result)
                    this.tableDatas=result.data.result

                })
            },
            submit:function () {
                this.$ajax({
                    method:"post",
                    url:"/saveIncome",
                    params:this.form

                }).then(result => {

                    if(result.data.success) {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        this.getTableData();
                    }
                    })
            },
            getSelect:function () {
                this.$ajax({
                    method:"get",
                    url:"/getSelects",

                }).then(result => {
                    console.log(result);
                    this.bankCard=result.data.result.bankCard
                })
            }
        }
    }
</script>

<style scoped>

</style>