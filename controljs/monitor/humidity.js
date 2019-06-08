$(function () {
    showDetails();
    // test
    // showIndex();
    $("#btnSearch").click(function () {
        var kssj = $("#txtKssj").val();
        var jssj = $("#txtJssj").val();
        if (kssj >= jssj) {
            layer.msg("开始时间必须小于结束时间", {
                time: TwTime,
                anim: Anim
            }, function () {
                $("#txtKssj").focus();
            });
            return;
        }
        if(parseInt(kssj.substr(5,2))>3){
            layer.msg("没有数据", {
                time: TwTime,
                anim: Anim
            }, function () {
                $("#txtKssj").focus();
            });
            return ;
        }
        showIndex();
        RefreshDataTable(true);
    });
});
// function freshData() {
//     var inputItem = $("#tbody");
//     var acTime = $("#txtKssj")[0].value;
//     var enTime = $("#txtJssj")[0].value;
//     var randleAcTime = acTime.substr(0,10);
//     var randleenTime = enTime.substr(0,10);
//     for(var i=0;i<10;i++){
//         var itemData="";
//
//         itemData = "<tr>\n" +
//             "<td class='details-control'></td>\n" +
//             "<td>"+(i+1)+"</td>\n" +
//             "<td>"+"01020304"+"</td>\n" +
//             "<td>"+"63686031"+Math.floor(Math.random()*100000)+"0000"+"</td>\n" +
//             "<td>-</td>\n" +
//             "<td>-</td>\n" +
//             "<td>120</td>\n" +
//             "<td>"+121+"</td>\n" +
//             "<td>"+"<button type=\\\"button\\\" data-toggle=\\\"tooltip\\\" data-placement=\\\"top\\\" title=\\\"波形分析\\\" class=\\\"btn btn-success btn-xs\\\" onclick='showDetail()'><span class=\\\"fa fa-line-chart fa-fw\\\"></span></button>"+"</td>\n"
//             "</tr>";
//         inputItem.append(itemData);
//     }
// }
// function format(d) {
//     var table = '<table cellpadding="5" cellspacing="0" style="margin-bottom:0" class="table table-bordered table-hover">';
//     table += "<tr><td style='width:120px'>入库时间</td><td style='text-align:left'>" + d.RKSJ + "</td></tr>";
//     table += "</table>";
//     return table;
// }
var showIcon = function(node){
    var parentnode = node.parentNode.parentNode.parentNode;
    var index = parentnode.getElementsByTagName('td')[1];
    var nodeId = index.getElementsByClassName('layui-table-cell laytable-cell-1-0-1')[0].innerText;
    var getIndex = $("#getIndex").val(nodeId);
    layer.open({
        type: 2,
        title: "湿度波形分析",
        shadeClose: false,
        shade: Shade,
        skin: LayerSkin,
        closeBtn: CloseBtn,
        area: ["80%", "100%"],
        content: "showHumiditychart.html",
        scrollbar: false
    });
};
$("#txtKssj").jeDate({
    isinitVal: false,
    ishmsVal: false,
    format: "YYYY-MM-DD hh:mm:ss",
    zIndex: 3000,
    isClear: false
});
$("#txtJssj").jeDate({
    isinitVal: false,
    ishmsVal: false,
    format: "YYYY-MM-DD hh:mm:ss",
    zIndex: 3001,
    isClear: false
});
var showIndex = function () {
    layui.use('table', function(){
        var table = layui.table;
        //第一个实例
        table.render({
            elem: '#demo'
            ,height: 480
            ,url: 'http://120.78.5.218:2333?id=2' //数据接口
            ,page: true //开启分页
            ,limit:10
            ,cols: [[ //表头
                {field: 'id', title: '', width:30}
                ,{field: 'index', title: '序号', width:80,align:'center'}
                ,{field: 'nodeIndex', title: '节点编号', width:150}
                ,{field: 'colIndex', title: '采集编号', width: 190}
                ,{field: 'longitude', title: '经度', width: 110, sort: true}
                ,{field: 'latitude', title: '纬度', width: 110, sort: true}
                ,{field: 'colSum', title: '总数', width: 60}
                ,{field: 'colTime', title: '采集时间', width: 200, sort: true}
                ,{field: 'action', title: '操作', width:60,templet:'<div><img src="../id_yzm/img.png" onclick="showIcon(this)"></div>'}
            ]]
        });
    });
}