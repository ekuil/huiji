<template>
    <div id="chart" style="width: 100%;height: 800px"></div>
</template>

<script>
    export default {
        name: "totalStatic",
        data(){
            return{}
        },
        created() {
            this.d();
        },
        methods:{
            d:function(){
                this.$ajax({
                    method:"get",
                    url:"/cateids",
                    params:{pid:1}

                }).then(result => {
                    console.log(Object.values(result.data))
                    let name=Object.keys(result.data);
                    let money=Object.values(result.data)


                    this.myEcharts(name,money)
                })

            },
            myEcharts(name,money){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("chart"));

                // 指定图表的配置项和数据
                let option =  {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [320, 302, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '邮件营销',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [150, 212, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '搜索引擎',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [820, 832, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                }

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    }

</script>

<style scoped>

</style>