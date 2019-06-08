var i;
localStorage['login'] = false;
$(document).ready(function(){
    var strName = localStorage.getItem('username');
    var strPass = localStorage.getItem('password');
    if(strName){
        $("#txtUsername").val(strName) ;
    }
    if(strPass){
        $("#txtPassword").val(strPass);
    }
});
$(function () {
    var $imgValidateCode = $("#imgValidateCode");
    i = Math.floor(Math.random()*10);
    $imgValidateCode.attr("src","./id_yzm/"+i+".png");
    document.onkeyup = function (e) {
        var value = e.keyCode;
        if (value == 13) {
            pressLogin();
        }
    }
    $("#btnLogin").click(pressLogin);

});
var pressLogin = function () {
    if (!CheckData()) {
        return;
    }
    var imgCode = $("#txtCode").val().trim();
    var useName = $("#txtUsername").val().trim();
    var passWord = $("#txtPassword").val().trim();
    var checked = $("#chkRemeber").is(":checked");
    if(checked){
        var storage=window.localStorage;
        storage.username = useName;
        storage.password = passWord;
    }else{
        return ;
    }
    confirmLogin(useName,passWord,imgCode,i);
}
function freshImg() {
    var $imgValidateCode = $("#imgValidateCode");
    i = Math.floor(Math.random()*10);
    $imgValidateCode.attr("src","./id_yzm/"+i+".png");
}
function CheckData() {
    var username = $("#txtUsername").val().trim();
    var password = $("#txtPassword").val().trim();
    var code = $("#txtCode").val().trim();
    if (username.length === 0) {
        layer.msg("请输入登录帐号", {
            time: TwTime,
            anim: Anim
        }, function () {
            $("#txtUsername").focus();
        });
        return false;
    }

    if (password.length === 0) {
        layer.msg("请输入登录密码", {
            time: TwTime,
            anim: Anim
        }, function () {
            $("#txtPassword").focus();
        });
        return false;
    }

    if (code.length === 0) {
        layer.msg("请输入验证码", {
            time: TwTime,
            anim: Anim
        }, function () {
            $("#txtCode").focus();
        });
        return false;
    }

    if (code.length !== 4) {
        layer.msg("验证码输入错误", {
            time: TwTime,
            anim: Anim
        }, function () {
            $("#txtCode").focus();
        });
        return false;
    }

    return true;
}
function confirmLogin(useName,passWord,imgCode,index) {
    var confirmCode = ["rtve","gupz","ng7n","tb7f","zft9","ahvt","zghh","q9yg","tk9q","zdde","bu5e"];
    if(useName == "admins" && passWord == "ZKFL123"){
        if(imgCode.toLowerCase() == confirmCode[index].toLowerCase()){
            localStorage['login'] = true;
            location.href = "main.html";
        }else{
            layer.msg("验证码错误", {
                time: TwTime,
                anim: Anim
            }, function () {
                $("#txtCode").focus();
            });
        }

    }else{
        layer.msg("密码错误", {
            time: TwTime,
            anim: Anim
        }, function () {
            $("#txtPassword").focus();
        });
    }
}