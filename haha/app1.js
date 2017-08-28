var express = require('express');123
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require("fs");

var routes = require('./routes/index');
var users = require('./routes/users');

var id = 2;

var app = express();


var mysql  = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    port: '3306',
    database: 'databasename',
  });

connection.connect();
    
app.get('/listUsers', function (req, res) {
   // fs.readFile( __dirname + "/" + "usees.json", 'utf-8', function (err, data) {
     var sql = 'select * from tablename';
     connection.query(sql,function (err,result) {
        // console.log( data );
        //  res.end( data );
         //data=JSON.parse(data);
        // console.log(typeof(data))
         //res.render({object:user})
        // res.render('yige',{table:data});

        if(err){
            console.log('error');
            return;
       }else{
           console.log('-----------------查询----------------');
           console.log(result);
           console.log('-----------------查询结束----------------');
          // res.render('haha',{table:result});
         }
       })
});

   
    
 app.get('/addUser', function(req, res) {

    var user = {
        "user5" : {
           "id":7,
           "name" : "mohit",
           "password" : "password4",
           "profession" : "teacher",
        }
     };


    var addsqlparams =[user.user5.id,user.user5.name,user.user5.password,user.user5.profession];
    
    var addsql = 'insert into tablename(id,name,password,profession)VALUES(?,?,?,?)';       

       connection.query(addsql,addsqlparams,function(err,result){

        if(err){
              console.log('error');
              return;

         }else{
             // console.log('-----------------新增成功----------------');
              console.log(result);
             //res.render('haha',{table:result});
             // console.log('-----------------结束----------------');
          }
    });
});

   // 读取已存在的数据
  // fs.readFile( __dirname + "/" + "usees.json", 'utf8', function (err, data) {
     //  data = JSON.parse( data );
      // data["user4"] = user["user4"];
      // console.log( data );
      // res.end( JSON.stringify(data));
       
 //  });
//});

/*
app.get('/deleteUser', function (req, res) {
    
       // First read existing users.
       fs.readFile( __dirname + "/" + "usees.json", 'utf8', function (err, data) {
           data = JSON.parse( data );
           delete data["user" + 2];
           console.log( data );
          // res.end( JSON.stringify(data));
           //res.render('haha',{table:data});
           
       });
    })

app.get('/:id', function (req, res) {
   // 首先我们读取已存在的用户
  // fs.readFile( __dirname + "/" + "usees.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
       //res.end( JSON.stringify(user));
       //res.render('haha',{table:data});
   });
//});


    
*/


 //view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.get('/',function(req,res){

//     res.render('haha');
// });

/*
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

*/

module.exports = app;
//connection.end();