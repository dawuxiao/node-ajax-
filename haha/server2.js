var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
var path = require('path');
var jade = require('jade');
var mysql = require('mysql');

app.set('views',(__dirname));
app.set('view engine', 'jade');


var connection = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"123456",
  port:"3306",
  database:"databasename",
});
connection.connect();


//查询数据
app.get('/listUsers', function (req, res) {
  var id = url.parse(req.url,true).query.id;
  if(id==undefined){
    var sql = 'SELECT * FROM tablename';
      connection.query(sql,function (err,result){
        //result=JSON.parse(result);
        if(err){
          console.log(err);
          return;
        }

        // console.log('-----------------查询----------------');
        // console.log(result);
        // console.log('-----------------查询结束----------------');
        // console.log(result);
        var result1 = result_to_JSON(result);
        //  console.log(result1);
        res.render('user', { table:result1 });
      });
      
      //res.end( JSON.stringify(data));
  }
  else{
    var sql = 'SELECT * FROM tablename WHERE id= '+id;
    connection.query(sql,function (err,result){
      if(err){
        console.log(err);
        return;
      }
      // console.log('-----------------查询----------------');
      // console.log(result);
      // console.log('-----------------查询结束----------------');
      var array = {};
      var key = "user"+id;
      array[key] = {
          'id': result[0].id,
          'name': result[0].name,
          'password': result[0].password,
          'profession': result[0].profession,
      };
      // console.log(array);
      res.render('user', { table:array });
    });
  } 
});


//增加数据
var user = {
  "user3" : {
    "id": 3,
    "name" : "suresh",
    "password" : "password3",
    "profession" : "librarian"
  }
}

app.get('/addUser', function (req, res) {
  var addsql = "INSERT INTO tablename(id,name,password,profession)VALUES(?,?,?,?)";
  var addsqlparams=[user.user3.id,user.user3.name,user.user3.password,user.user3.profession]
  connection.query(addsql,addsqlparams,function (err,result) {
    if(err){
      console.log(err);
      return;
    }
    // console.log('-----------------新增成功----------------');
    //  console.log(result);
    // console.log('-----------------结束----------------');
    //  var result1 = result_to_JSON(result);    
     res.render('user2');
    
  })
})

//修改数据
/*app.get('/updateUser', function (req, res) {
  var modsql = 'UPDATE test SET name=? WHERE id = 4';
  var modsqlparams = ["zhouyong","password5","docoter"];
  connection.query(modsql,modsqlparams,function (err,result) {
      if(err){
          console.log(err);
          return;
      }
      // console.log('--------------------------------');
      // console.log(result);
      // console.log('--------------------------------');
      res.render('user', { table:result });      
  });
});*/




//删除数据
app.get('/deleteUser', function (req, res) {
  var id=url.parse(req.url,true).query.id;
  var delsql = 'DELETE FROM tablename where id = '+id;  
  connection.query(delsql,function (err,result) {
    if(err){
        console.log(err);
        return;
    }
    // console.log('----------删除-------------');
    //  console.log(result);
    // var result1 = result_to_JSON(result);    
    res.render('user2');      
  });
});
  


function result_to_JSON(result) {
  var array = {};
  // console.log(data);
  for (var i =0 ; i < result.length; i++) {
      var key = "user"+(i+1)
      console.log(key);
      array[key] = {
          'id': result[i].id,
          'name': result[i].name,
          'password': result[i].password,
          'profession': result[i].profession,
      };
  }
  // console.log(array);
  return array;
}

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为http://127.0.0.1:3000/", host, port)

})
