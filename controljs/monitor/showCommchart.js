var myChart = echarts.init(document.getElementById("container"));
var item = parent.$("#getIndex").val();
var showDataJson;

if((item >= 1 && item <= 20) || (item >= 80 && item <= 100)){
    showDataJson = 1
}else{
    showDataJson = 0;
}

var $src1 = "../controljs/showCommunication/chart"+showDataJson+".json";
$.get($src1, function (data) {
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart.setOption(
        option = {
            title: {
                text: '设备状态图'
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#505765"
                    }
                }
            },
            legend: {
                data: ["设备状态"],
                x: "center"
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: "none"
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: [
                {
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    axisLabel: { showMaxLabel: true },
                    data: data.map(function (item) {
                        //最下方值
                        return item.date;
                    })
                }
            ],
            yAxis: {
                axisLabel: {
                    formatter: function (val) {
                        //左边纵坐标
                        return (val) ;
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            //虚线对应的纵坐标
                            return ((params.value - base)).toFixed(1);
                        }
                    }
                },
                splitNumber:1/3,
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: "设备状态",
                    type: "line",
                    lineStyle: {
                        width: 1
                    },
                    data: data,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                }
            ]
        }

    );
});