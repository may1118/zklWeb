if(localStorage.getItem('login') == null || localStorage.getItem('login') == false){
    location.href = 'index.html';
}
layui.use('element', function(){
    var element = layui.element;
});
var changeTab = $("#changTab a");
var bodyContent = $("#bodyContent");
var systemMain = $("#systemMain")[0];
systemMain.onclick = function () {
    bodyContent.attr('src',"map.html");
};
for (let i=0;i<changeTab.length;i++){
    changeTab[i].onclick = function () {
        var $src = "";
        switch (i) {
            case 0:$src = "monitor/lightning.html";break;
            case 1:$src = "monitor/atmosphere.html";break;
            case 2:$src = "monitor/frequency.html";break;
            case 3:$src = "monitor/temperature.html";break;
            case 4:$src = "monitor/humidity.html";break;
            case 5:$src = "monitor/PM2.5.html";break;
            case 6:$src = "monitor/communication.html";break;
            case 7:$src = "monitor/showWarning.html";break;
        }
        bodyContent.attr('src',$src);
    }
}