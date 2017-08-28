var TEST_DATABASE =  'databasename';
var TEST_TABLE = 'tablename';

 //连接数据库
var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  port: '3306',
  database: TEST_DATABASE ,
});

 connection.connect();

//查询数据
var sql = 'select * from tablename';
connection.query(sql,function (err,result) {
    if(err){
        console.log('error');
        return;
    }
    console.log('-----------------查询----------------');
    console.log(result);
    console.log('-----------------查询结束----------------');
})

var user = {
	"name" : "mohit",
	"password" : "password4",
	"profession" : "teacher",
	"id": 4
 };

 
//增加数据
var addsql = 'insert into tablename(id,name,password,profession)VALUES(?,?,?,?)';

var addsqlparams =[6,'monim','password5','doctor'];

connection.query(addsql,addsqlparams,function (err,result) {
    if(err){
        console.log('error');
        return;
    }
    console.log('-----------------新增成功----------------');
    console.log(result);
    console.log('-----------------结束----------------');
});
 



//修改数据
var modsql = 'UPDATE tablename SET name = ?,password = ? WHERE id = ?';
var modsqlparams = [4,'mohit','password4','teacher'];
connection.query(modsql,modsqlparams,function (err,result) {
    if(err){
        console.log('err');
        return;
    }
    console.log('--------------------------------');
    console.log(result);
    console.log('--------------------------------');
})

//删除数据
var delsql = 'DELETE FROM tablename where id = 2';
connection.query(delsql,function (err,result) {
    if(err){
        console.log('err');
        return;
    }
    console.log('----------删除-------------');
    console.log(result);
})
connection.end();