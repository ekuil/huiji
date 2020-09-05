<template>
    <el-main>

        <el-select v-model="form.createId" placeholder="个人消费">
            <el-option v-for="item in createId" :key="item.nickName" :label="item.nickName" :value="item.userId"/>
        </el-select>
        <el-select v-model="form.cardId" placeholder="选择卡">
            <el-option v-for="item in bankCard" :key="item.cardName" :label="item.cardName" :value="item.id"/>
        </el-select>
            <el-date-picker
                    v-model="value2"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptionsQuery">
            </el-date-picker>

        <el-input
                style="width: 200px;margin-left: 0px"
                placeholder="请输入内容"
                v-model="queryInfo"
                clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="query()">搜索</el-button>
    <el-button type="text"  @click="reset()" style="margin-right: 20px">新建账单</el-button>
        <el-dialog title="新的消费" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules"  ref="form">
                <el-form-item label="消费者" :label-width="formLabelWidth" prop="createId">
                    <el-select v-model="form.createId" placeholder="谁花的钱">
                    <el-option v-for="item in createId" :key="item.nickName" :label="item.nickName" :value="item.userId"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="享受者" :label-width="formLabelWidth" prop="ownerId">
                    <el-select v-model="form.ownerId" placeholder="花给谁了">
                        <el-option v-for="item in owner" :key="item.ownerName" :label="item.ownerName" :value="item.ownerId"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="biilname">
                    <el-input v-model="form.biilname" ></el-input>
                </el-form-item>
                <el-form-item label="消费金额" :label-width="formLabelWidth" prop="spend">
                    <el-input v-model="form.spend" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="消费时间" :label-width="formLabelWidth" >
                    <el-date-picker
                            v-model="form.createTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="消费类别" :label-width="formLabelWidth" >

                    <el-input v-model="form.categoryId"  v-show="hide"></el-input>
                    <el-input v-model="form.label"   @click.native="changeSelectTree()" ></el-input>
                    <el-tree
                            ref="tree"
                            v-show="isShowSelect"
                            :data="treeData"
                            node-key="id"
                            default-expand-all
                            @node-click="selectClassfy"
                            :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>

      </span>
                    </el-tree>
                </el-form-item>
                <el-form-item label="消费渠道" :label-width="formLabelWidth" prop="payWayId">
                    <el-select v-model="form.payWayId" placeholder="请选择消费渠道">
                        <el-option v-for="item in payWay" :key="item.wayName" :label="item.wayName" :value="item.id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付卡" :label-width="formLabelWidth" prop="cardId">
                    <el-select v-model="form.cardId" placeholder="哪个卡的钱">
                        <el-option v-for="item in bankCard" :key="item.cardName" :label="item.cardName" :value="item.id"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>

        </el-dialog>
        <el-drawer
                title="EIT"
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="ltr"
                custom-class="demo-drawer"
                ref="drawer"
        >
            <div class="demo-drawer__content">
                <el-form :model="form" :rules="rules"  ref="form">
                    <el-form-item label="消费者" :label-width="formLabelWidth" prop="createId">
                        <el-select v-model="form.createId" placeholder="谁花的钱">
                            <el-option v-for="item in createId" :key="item.nickName" :label="item.nickName" :value="item.userId"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="享受者" :label-width="formLabelWidth" prop="ownerId">
                        <el-select v-model="form.ownerId" placeholder="花给谁了">
                            <el-option v-for="item in owner" :key="item.ownerName" :label="item.ownerName" :value="item.ownerId"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称" :label-width="formLabelWidth" prop="biilname">
                        <el-input v-model="form.biilname" ></el-input>
                    </el-form-item>
                    <el-form-item label="消费金额" :label-width="formLabelWidth" prop="spend">
                        <el-input v-model="form.spend" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="消费时间" :label-width="formLabelWidth" >
                        <el-date-picker
                                v-model="form.createTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="消费类别" :label-width="formLabelWidth" prop="categoryId">
                        <!--                    <el-select v-model="form.categoryId" placeholder="请选择消费类别" class="selectTree-input">-->
                        <!--                        <el-option v-for="item in category" :key="item.categoryName" :label="item.categoryName" :value="item.categoryId"/>-->
                        <el-input v-model="form.categoryId"  v-show="hide"></el-input>
                        <el-input v-model="form.label"   @click.native="changeSelectTree()" ></el-input>
                        <el-tree
                                ref="tree"
                                v-show="isShowSelect"
                                :data="treeData"
                                node-key="id"
                                default-expand-all
                                @node-click="selectClassfy"
                                :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>

      </span>
                        </el-tree>
                    </el-form-item>
                    <el-form-item label="消费渠道" :label-width="formLabelWidth" prop="payWayId">
                        <el-select v-model="form.payWayId" placeholder="请选择消费渠道">
                            <el-option v-for="item in payWay" :key="item.wayName" :label="item.wayName" :value="item.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付卡" :label-width="formLabelWidth" prop="cardId">
                        <el-select v-model="form.cardId" placeholder="哪个卡的钱">
                            <el-option v-for="item in bankCard" :key="item.cardName" :label="item.cardName" :value="item.id"/>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
    <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%">
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                prop="createName"
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
                prop="categoryName"
                label="消费类别">
        </el-table-column>
        <el-table-column
                prop="ownerName"
                label="享受者">
        </el-table-column>
        <el-table-column
                prop="wayName"
                label="消费渠道">
        </el-table-column>

        <el-table-column
                prop="payWayId"  v-if="false"
                label="消费渠道">
        </el-table-column>
        <el-table-column
                prop="bankName" :visible.sync="hidden"
                label="卡号">
        </el-table-column>
        <el-table-column
                prop="categoryId"  v-if="false"
                label="消费类别">
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="消费时间">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
<!--                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                <el-button type="text" size="small" @click="handleClickForEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleClickForDel(scope.row)"> 删除</el-button>

            </template>
        </el-table-column>
    </el-table>


        <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>
    </el-main>
</template>

<script>
    import addConsume from "./addConsume";
    export default {
        name: "outTable",

        data(){
            const treeData =[]
                return{
                    multipleSelection: [],
                value2:"",
                    hidden:false,
                    pickerOptionsQuery: {
                        shortcuts: [{
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                    },
                    queryInfo:"",
                dialog: false,
                    loading: false,
                hide:false,
                isShowSelect:false,
                rules:{
                    createId:[
                        { required: true, message: '请选择消费者', trigger: 'blur' },
                    ],
                    biilname:[
                        { required: true, message: '请填写商品名称', trigger: 'blur' }
                    ],
                    ownerId:[
                        { required: true, message: '请选择享受者', trigger: 'blur' }
                    ],
                    spend:[
                        { required: true, message: '请填写消费金额', trigger: 'blur' },
                        // { type: 'number', message: '数字', trigger: 'blur' }

                    ],
                    cardId:[
                        { required: true, message: '请选择银行卡', trigger: 'blur' }

                    ],
                    payWay:[
                        { required: true, message: '请选择消费渠道', trigger: 'blur' }

                    ],
                    categoryId:[
                        { required: true, message: '请选择消费类别', trigger: 'blur' }
                    ]
                },
                tableData:"",
                time:"",
                payWay:"",
                bankCard:"",
                form:{
                    biilname:"",
                    createTime:"",
                    createId:"",
                    ownerId:"",
                    categoryId:"",
                    spend:"",
                    payWayId:"",
                    cardId:"",
                    label:""
                },
                formLabelWidth: '100px',
                dialogFormVisible:false,
                createId:"",
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
            this.loadData();
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
                    this.category=result.data.result.categories
                    this.payWay=result.data.result.payWay
                    this.bankCard=result.data.result.bankCard
                    console.log(this.form.category)
                })
            },
            submit:function (form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
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
                                this.getTableData();

                            }
                        })
                    } else {

                        return false;
                    }});

                console.log(this.form);
            },
            loadData:function () {
                this.$ajax({
                    method:"get",
                    url:"/categories",

                }).then(result => {
                    console.log(result);

                    this.treeData=result.data.result;


                })
            },
            changeSelectTree:function () {
                this.isShowSelect=true
            },
            selectClassfy:function () {
                let node=this.$refs.tree.getCurrentNode();
                this.form.categoryId=node.id;
                this.form.label=node.label;
                this.isShowSelect=false

            },
            handleClickForEdit:function (data) {
                this.form=data
                this.form.label=data.categoryName
                this.dialogFormVisible=true
            },
            handleClickForDel:function (data) {
                this.$confirm('再次确认避免误操作，真的删除吗', '提示', {
                    confirmButtonText: '真的',
                    cancelButtonText: '点错了',
                    type: 'warning'
                }).then(()=>{
                    this.$ajax({
                        method:"get",
                        url:"/consumeDel",
                        params:data
                    }).then(result => {
                        if(result.data.success){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.getTableData();
                        }
                    })
                })
            },
            reset:function () {
                this.form= {
                    biilname:"",
                        createTime:"",
                        createId:"",
                        ownerId:"",
                        categoryId:"",
                        spend:"",
                        payWayId:"",
                        cardId:"",
                        label:""
                }
                this.dialogFormVisible=true;
            },
            query:function () {
                alert(this.value2[0])
                this.$ajax({
                    method:"get",
                    url:"/ConsumesList",
                    params: {cardId:this.form.cardId,startTime:this.value2[0],endTime:this.value2[1]}

                }).then(result => {
                    console.log(result)
                    this.tableData=result.data

                })
            }
        }
    }
</script>

<style scoped>

</style>