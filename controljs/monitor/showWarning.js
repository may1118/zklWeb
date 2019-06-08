var myChart1 = echarts.init(document.getElementById("container1"));
var myChart2 = echarts.init(document.getElementById("container2"));
var myChart3 = echarts.init(document.getElementById("container3"));
var myChart6 = echarts.init(document.getElementById("container4"));

var item = 0;
var $src1 = "../controljs/showlight_json/chart"+item%6+".json";
var $src2 = "../controljs/showFre/chart"+item%6+".json";
var $src3 = "../controljs/showTem/chart"+item%6+".json";
var $src6 = "../controljs/showAtmosphere/chart"+item%6+".json";
var data1,data2,data3,data6;

$.get($src1, function (data) {
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart1.setOption(
        option = {
            title: {
                text: '雷电流变化图'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: data.map(function (item) {
                    //最下方值
                    return item.date;
                })
            },
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
                    name:'最高雷电流',
                    type:'line',
                    data:data,
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
$.getJSON($src2, function (data) {
    var option = {
        title: {
            text: '动作次数监测波形分析',
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
            type: 'value'
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
    myChart2.setOption(option);
});
$.get($src3, function (data) {
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart3.setOption(
        option = {
            title: {
                text: '温度变化图'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: data.map(function (item) {
                    //最下方值
                    return item.date;
                })
            },
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
                    name:'最高气温',
                    type:'line',
                    data:data,
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
$.get($src6, function (data) {
    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    myChart6.setOption(
        option = {
            title: {
                text: '大气电场变化图'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: data.map(function (item) {
                    //最下方值
                    return item.date;
                })
            },
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
                    name:'动作次数',
                    type:'line',
                    data:data,
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