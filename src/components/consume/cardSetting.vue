<template>
    <el-main>
        <el-button type="text" @click="dialogFormVisible = true">新增卡</el-button>
        <el-dialog title="新的消费" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="卡号" :label-width="formLabelWidth">
                    <el-input v-model="form.cardNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="卡名" :label-width="formLabelWidth">
                    <el-input v-model="form.cardName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="月额" :label-width="formLabelWidth">
                    <el-input v-model="form.remain" autocomplete="off"></el-input>
                </el-form-item>

<!--                <el-form-item label="创建时间" :label-width="formLabelWidth">-->
<!--                    <el-date-picker-->
<!--                            v-model="form.createTime"-->
<!--                            type="datetime"-->
<!--                            placeholder="选择日期时间"-->
<!--                            value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                            :picker-options="pickerOptions">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
                <el-form-item label="谁的卡" :label-width="formLabelWidth">
                    <el-select v-model="form.userId" placeholder="谁名下的卡谁">
                        <el-option v-for="item in sysUser" :key="item.nickName" :label="item.nickName" :value="item.userId"/>
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
                    prop="cardName"
                    label="卡名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="cardNumber"
                    label="卡号">
            </el-table-column>
            <el-table-column
                    prop="remain"
                    label="余额"
                    width="180">
            </el-table-column>


        </el-table>


    </el-main>
</template>

<script>
    import cardSetting from "./cardSetting.vue";
    export default {
        name: "outTable",

        data(){
            return{
                tableData:"",
                sysUser:{
                    userName:"",
                    userId:""
                },
                form:{
                    cardNumber:"",
                    cardName:"",
                    remain:"",
                    userId:""

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
                    url:"/cardList",

                }).then(result => {
                    console.log(result)
                    this.tableData=result.data.result

                })
            },
            loadSelects:function () {
                this.$ajax({
                    method:"get",
                    url:"/getUsers",

                }).then(result => {
                    console.log(result);

                    this.sysUser=result.data.result
                    console.log(this.form.category)


                })
            },
            submit:function () {
                this.$ajax({
                    method:"get",
                    url:"/saveCard",
                    params:this.form

                }).then(result => {
                    if(result.data.success){
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.dialogFormVisible=false;
                        this.getTableData();
                    }


                })
                console.log(this.form);
            }
        }
    }
</script>

<style scoped>

</style>