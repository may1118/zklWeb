var myChart = echarts.init(document.getElementById("container"));
var item = parent.$("#getIndex").val();
var showDataJson;
if(item >= 63 && item <= 70){
    showDataJson = item % 4;
}else{
    showDataJson = item % 9 + 4;
}
var $src = "../controljs/showFre/chart"+showDataJson+".json";
$.getJSON($src, function (data) {
    var option = {
        title: {
            text: '动作次数变化图',
            left: 'center',
            top: 0
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: [{
            type: 'value'
        }],
        yAxis: [{
            type: 'value',
            // splitNumber:colIndex
        }],
        series: [{
            name: '动作次数',
            type: 'scatter',
            symbolSize: 13,
            data: data
        }]
    };
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart.setOption(option);
});
