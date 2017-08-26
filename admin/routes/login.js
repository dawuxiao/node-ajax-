var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();
// var http =require('http');
/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// })
var url=require('url')
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'dawuxiao',
  });
//   connection.connect();
router.get("/",function(req,res){
    console.log('ok');
  var sql='SELECT * FROM wo';
  //在数据库里面查询用户和密码
  connection.query(sql,function(err,result){
      var name=url.parse(req.url,true).query.name;
      var password=url.parse(req.url,true).query.password;
      console.log(req.url);
    //执行aql语句，并返回结果
    if(err){
        // res.end("login error");
        console.log(err);
        return;
    }
    for(var i=0;i<result.length;i++)
    {
        if(result[i].name==name && result[i].passwod==password)
        {
            res.end('登陆成功');
        }else{
            res.end('登录失败');
        }
    }
   
 });
});
module.exports = router;