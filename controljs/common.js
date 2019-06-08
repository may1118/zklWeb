function ValidateSession(level) {
    var url, errurl;
    if (level === 0) {
        url = "ashx/common.ashx?action=ValidateSession";
        errurl = "error.html";
    } else {
        url = "../ashx/common.ashx?action=ValidateSession";
        errurl = "../error.html";
    }
    $.ajax({
        type: "post",
        dataType: "json",
        url: url,
        async: false,
        success: function (data) {
            if (data.code !== "0000") {
                parent.parent.location.href = errurl;
                return;
            }
        },
        error: function () {
            parent.parent.location.href = errurl;
            return;
        }
    });
}

function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}

function isInteger(val) {
    var type = "^[0-9]*[1-9][0-9]*$";
    var r = new RegExp(type);
    return r.test(val);
}


function strIsnull(s) {
    var str = s;
    if (s === "" || s === null || s === "null") {
        str = "-";
    }
    return str;
}

function strIsTooLong(s) {
    var str = strIsnull(s);
    if (str.length > 20) {
        str = str.substr(0, 20) + "...";
        str = '<div data-toggle=\"tooltip\" data-placement=\"top\" title=\"' + s + '\">' + str + "</div>";
    }
    return str;
}

function CloseLayer() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function showDetails() {
    $("#datatables tbody").on("click", "td.details-control", function () {
        var tr = $(this).closest("tr");
        var table = $("#datatables").DataTable();
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass("shown");
        }
        else {
            row.child(format(row.data())).show();
            tr.addClass("shown");
        }
    });
}

//刷新表格
function RefreshDataTable(IsRefresh) {
    var table = $("#datatables").DataTable();
    table.ajax.reload(function () {
        $("[data-toggle='tooltip']").tooltip();
    }, IsRefresh);
}

//layer全局变量
var TwTime = 1500;
var LayerSkin = "layui-layer-rim";
var Anim = 6;
var CloseBtn = 1;
var Shade = 0.4;