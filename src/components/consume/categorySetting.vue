<template>
    <div class="block">

        <el-tree
                ref="tree"
                :data="data"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>

      </span>
        </el-tree>
        <el-button @click="appends">新增类别</el-button>
        <el-button @click="del">删除类别</el-button>
    </div>
</template>

<script>
    let id = 1000;

    export default {
        data() {
            const data = [{
            //     id: 1,
            //     label: '一级 1',
            //     children: [{
            //         id: 4,
            //         label: '二级 1-1',
            //         children: [{
            //             id: 9,
            //             label: '三级 1-1-1'
            //         }, {
            //             id: 10,
            //             label: '三级 1-1-2'
            //         }]
            //     }]
            // }, {
            //     id: 2,
            //     label: '一级 2',
            //     children: [{
            //         id: 5,
            //         label: '二级 2-1'
            //     }, {
            //         id: 6,
            //         label: '二级 2-2'
            //     }]
            // }, {
            //     id: 3,
            //     label: '一级 3',
            //     children: [{
            //         id: 7,
            //         label: '二级 3-1'
            //     }, {
            //         id: 8,
            //         label: '二级 3-2',
            //         children: [{
            //             id:18,
            //             label:'三级 3-1'
            //         }]
            //     }]
            }];
            return {

                data: JSON.parse(JSON.stringify(data))
            }
        },
        created() {
          this.loadData();
        },

        methods: {
            append(data) {
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            appends:function () {
                let node=this.$refs.tree.getCurrentNode();
                console.log(node);
                if(node==null){
                    this.$notify({
                        title: '提示',
                        message: '先选中一个节点再添加',
                        offset: 200
                    });

                }else{
                    let name=node.label;
                    let pid=node.id;
                    this.$prompt(name+'下边还有啥', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        // inputPattern:,
                        // inputErrorMessage: 'con not  be null'
                    }).then(({ value }) => {
                        this.$ajax({
                            method:"get",
                            url:"/addCategory",
                            params:{pid:pid,name:value}

                        }).then(result => {
                          if( result.data.success){
                              this.loadData();
                              this.$message({
                                  type: 'info',
                                  message: result.data.msg
                              });
                          }

                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });

                }
            },
            loadData:function () {
                this.$ajax({
                    method:"get",
                    url:"/categories",

                }).then(result => {
                    console.log(result);

                    this.data=result.data.result;


                })
            },
            del:function () {
                let node = this.$refs.tree.getCurrentNode();

                if (node == null) {
                    this.$notify({
                        title: '提示',
                        message: '选中节点后删除',
                        offset: 200
                    });
                }else{
                    this.$confirm('再次确认避免误操作，真的删除吗', '提示', {
                        confirmButtonText: '真的',
                        cancelButtonText: '点错了',
                        type: 'warning'
                    }).then(() => {
                        console.log(node)
                        const id=node.id;
                        alert(id)
                        this.$ajax({
                            method:"get",
                            url:"/delCategory",
                            params:{id:id}
                        }).then(result => {
                            this.$message({
                                type: 'info',
                                message: '删除成功'
                            });
                            this.loadData()
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '恩啊'
                        });
                    });
                }
            }

        }
    };
</script>

<style scoped>

</style>