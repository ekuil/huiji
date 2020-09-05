<template>
<div>
    <el-drawer
            title="今日消费详情"
            size="32%"
            :visible.sync="drawer"
            :with-header="false"

   >
        <span><b style="color: crimson">{{day}}</b> 消费记录</span>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column

                    width="55">
            </el-table-column>
            <el-table-column
                    prop="createName"
                    label="消费者"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="biilname"
                    width="120"
                    label="账单名称">
            </el-table-column>
            <el-table-column
                    prop="spend"
                    label="消费/元"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="ownerName"
                    width="120"
                    label="享受者">
            </el-table-column>

        </el-table>
       <template>
           <div id="chart" style="height: 500px">a</div>
       </template>

    </el-drawer>
    <el-calendar v-model="value" style="height: 600px">

        <template
                slot="dateCell"
                slot-scope="{date, data}">
            <p :class="'is-selected'">
                {{ data.day.split('-').slice(1).join('-') }}{{ data.isSelected ? '✔️' : ''}}
                {{ data.isSelected ? c(data.day) : ''}}

            </p>
            <div v-for="(item,index) in obj"  :key="index" v-if="item.theDay == data.day" style="color: firebrick" @click="b(data.day)">{{item.money}}</div>
        </template>

    </el-calendar>
    <b >本月共计:<span v-model="total" style="color: firebrick">{{total}} 元</span></b>
    <div id="mouthChart" style="height: 500px"></div>
</div>
</template>

<script>

    import calender from "./calender.vue";
    export default {
        name: "calender.vue",
        data(){

            return{
                value:new Date(),
                obj:[],
                drawer:false,
                tableData:"",
                day:"1",
                total:"12",
                selectedVal:""
            }

        },
        beforeCreate() {
            this.$ajax({
                method:"get",
                url:"/byDay",

            }).then(result => {

                this.obj=result.data.result

            })
        },
        created() {
        },
        methods:{
            a:function (day) {
                for(let i=0;i<this.obj.length;i++){
                    return day==this.obj[i].theDay?this.obj[i].money:"暂无数据";
                }
            },
            b:function (data) {

                this.day=data
                this.drawer=true
                this.$ajax({
                    method:"get",
                    url:"/ConsumesList",
                    params:{formatDate:data}

                }).then(result => {
                    this.d()

                    this.tableData=result.data
                })
            },
            c:function (data) {
                this.day=data

                this.$ajax({
                    method:"get",
                    url:"/thisMouthCount",
                    params:{thisMouth:data}

                }).then(result => {
                    this.total=result.data.result

                    this.e();
                })
            },
            d:function(){
                this.$ajax({
                    method:"get",
                    url:"/cateids",
                    params:{pid:1,date:this.day,mouth:false}

                }).then(result => {
                    console.log(Object.values(result.data))
                    let name=Object.keys(result.data);
                    let money=Object.values(result.data)

                    let re=new Array();
                    for(let i=0;i<name.length;i++){
                        let obj={};
                        obj.value=money[i];
                        obj.name=name[i];
                        re.push(obj);
                    }
                    this.myEcharts(re,"chart","今日消费统计")
                })

            },
            e:function(){
                this.$ajax({
                    method:"get",
                    url:"/cateids",
                    params:{pid:1,mouth:true,date:this.day}

                }).then(result => {
                    console.log(Object.values(result.data))
                    let name=Object.keys(result.data);
                    let money=Object.values(result.data)

                    let re=new Array();
                    for(let i=0;i<name.length;i++){
                        let obj={};
                        obj.value=money[i];
                        obj.name=name[i];
                        re.push(obj);
                    }
                    this.myEcharts(re,"mouthChart","本月消费统计")
                })
            },
            myEcharts(data,id,name){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById(id));

                // 指定图表的配置项和数据
                let option ={
                    backgroundColor: '#cccccc',

                    title: {
                        text: '消费类别',
                        left: 'left',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}元 占总比:({d}%)'
                    },

                    // visualMap: {
                    //     show: true,
                    //     min: 0,
                    //     max: 1000,
                    //     inRange: {
                    //         colorLightness: [0, 1]
                    //     }
                    // },
                    series: [
                        {
                            name: name,
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '50%'],
                            data: data.sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                color: 'rgba(0, 0, 0, 0.3)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                // color: '#cfe2f3',
                                color:"#368b9d",
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                }

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }

        }
    }
</script>



<!--<style lang="scss">-->
<!--    .el-drawer.rtl {-->
<!--        overflow: scroll-->
<!--    }-->
<!--</style>-->




