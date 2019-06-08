var mysql  = require('mysql');
var http = require("http");
var URL = require('url');
var request = require("request");
var querystring = require("querystring");

var connection = mysql.createConnection({
    host     : 'rm-bp1p625j8640m9ug7uo.mysql.rds.aliyuncs.com',
    user     : 'root',
    password : 'Caa123456',
    database : 'zklpages'
});
connection.connect();
var server = http.createServer(function (req,res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var str=URL.parse(req.url,true).query;
    var arg = querystring.parse(URL.parse(req.url).query);
    var id = parseInt(arg.id);
    if(id==1){
        var  sql = 'SELECT * FROM pages';
    }else if(id==2){
        var  sql = 'SELECT * FROM pages2';
    }else if(id==3){
        var  sql = 'SELECT * FROM pagewarning';
    }
    var page = parseInt(arg.page-1);
    var limit = parseInt(arg.limit);
    var showData = "";
    //访问数据库
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        showData += "{\n" +
            "  \"code\":0,\n" +
            "  \"msg\":\"\",\n" +
            "  \"count\":"+result.length+",\n" +
            "  \"data\":[\n" +
            "    ";
        var data ;
        for (var i=page*10;i<page*10+limit-1;i++){
            showData+="{\n" +
                "      \"\": \"\",\n" +
                "      \"index\":"+result[i].index+",\n" +
                "      \"nodeIndex\":\""+result[i].nodeIndex+"\",\n" +
                "      \"colIndex\":\""+result[i].colIndex+"\",\n" +
                "      \"longitude\":\""+result[i].longitude+"\",\n" +
                "      \"latitude\":\""+result[i].latitude+"\",\n" +
                "      \"colSum\":"+result[i].colSum+",\n" +
                "      \"colTime\":\""+result[i].colTime+"\"\n" +
                "    },"
        }
        showData+="{\n" +
            "      \"\": \"\",\n" +
            "      \"index\":"+result[page*10+limit-1].index+",\n" +
            "      \"nodeIndex\":\""+result[page*10+limit-1].nodeIndex+"\",\n" +
            "      \"colIndex\":\""+result[page*10+limit-1].colIndex+"\",\n" +
            "      \"longitude\":\""+result[page*10+limit-1].longitude+"\",\n" +
            "      \"latitude\":\""+result[page*10+limit-1].latitude+"\",\n" +
            "      \"colSum\":"+result[page*10+limit-1].colSum+",\n" +
            "      \"colTime\":\""+result[page*10+limit-1].colTime+"\"\n" +
            "    }]}";

        res.write(showData);
        res.end();
    });
    }
).listen(2333,"120.78.5.218");