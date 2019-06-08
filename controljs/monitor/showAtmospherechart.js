var myChart = echarts.init(document.getElementById("container"));
var item = parent.$("#getIndex").val();
var showDataJson;
var colIndex = 0.1;
if(item ==68 ){
    colIndex = 3;
    showDataJson = 0;
}
else if(item==67 || item==69) {
    colIndex = 3;
    showDataJson = item % 3 + 1;
}else{
    //正常情况下的json文件
    showDataJson = item % 12 + 1;
}



var $src1 = "../controljs/showAtmosphere/chart"+showDataJson+".json";
$.get($src1, function (data) {
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart.setOption(
        option = {
            title: {
                text: '大气电场变化图'
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
                data: ["大气电场幅值"],
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
                splitNumber: colIndex,
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: "大气电场幅值",
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