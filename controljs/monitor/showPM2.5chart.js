var myChart = echarts.init(document.getElementById("container"));
var item = parent.$("#getIndex").val();
var showDataJson;

if(item ==68 ){
    showDataJson = 0;
}
else if(item ==67 || item == 69) {
    showDataJson = item % 3 + 1;
}else if(item >= 69){
    showDataJson = item % 2 + 1;
    if(showDataJson == 2) showDataJson++;
}
else{
    showDataJson = item % 9 + 4;
}
var $src1 = "../controljs/showPM2.5/chart"+showDataJson+".json";
$.get($src1, function (data) {
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart.setOption(
        option = {
            title: {
                text: 'PM2.5变化图'
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
                data: ["PM2.5变化值"],
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
                    name: "PM2.5变化值",
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