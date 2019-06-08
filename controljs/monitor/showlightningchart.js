var myChart = echarts.init(document.getElementById("container"));
var item = parent.$("#getIndex").val();
var showDataJson;
if(item ==68 ){
    $("#danger").show();
    showDataJson = 0;
}
else if(item>=63 && item<=70) {
    showDataJson = item % 3 + 1;
}
else{
    //正常情况下的json文件
    showDataJson = item % 12 + 1;
}

var $src1 = "../controljs/showlight_json/chart"+showDataJson+".json";
$.get($src1, function (data) {
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart.setOption(
        option = {
            title: {
                text: '雷电流变化图'
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
                data: ["雷电流幅值"],
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
                splitNumber: 3,
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: "雷电流幅值",
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