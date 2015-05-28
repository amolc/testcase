var http = require('http');
var mysql = require('mysql');

// DB connection
var connection = mysql.createPool({
	host :'localhost',
  	user : 'root',
  	password : '',
  	database : 'test1',
});

var CRUD = require('mysql-crud');
var userCRUD = CRUD(connection, 'infodemo');// table name
var userlogCRUD= CRUD(connection, 'login');//table name

exports.addUser = function(req, res) {
	
	userCRUD.create({
		'fname': req.body.firstName,
		'lname': req.body.LastName,
		'mob_no': req.body.MobileNumber,
		'address': req.body.Address
	}, function(err, vals)
	{
		if(err){
			console.log(err);
			res.jsonp(err);
		} else {
			res.jsonp(vals);
		}
		
	});
}

   exports.listUser = function(req, res) {
	  var lis="select * from infodemo";
	  connection.query( lis , function(err, rows){
      res.jsonp(rows);
	});
}

   exports.updateuser = function(req, res){
      console.log(req);
      userCRUD.update({'srno' : req.body.srno },{'fname' : req.body.fname , 'lname' : req.body.lname  , 'mob_no' : req.body.mob_no , 'address' : req.body.address },
      function (err, vals) {
      if(err){
      	console.log(err);
	    res.jsonp(err);
	     } else {
	     	res.jsonp(vals);
	     }
    });
 }
  
   // btrprofileCRUD.update({'prfId' :req.body.prfId},{'fname' :req.body.fname, 'lname' :req.body.lname, 'contactno' :req.body.contactno, 'tagline' :req.body.tagline, 'skills' :req.body.skills, 'city' :req.body.city, 'country' :req.body.country }, function (err, val) {

   exports.deluser = function(req, res){
 	 console.log("in Delete User Function in trial api");
     var del= " delete from infodemo where srno  = "+ req.body.srno   ;
 	 connection.query( del , function(err, rows){
       if(err) {
        console.log(err);
     	res.jsonp(err);
     
     } else {
     	res.jsonp(rows);
     } 
 	});
 }

 exports.loginuser=function(req, res){
 
    console.log(req.body);
    var username = req.body.username;
	var password = req.body.password;
	console.log(username);
	//console.log(password);

	CRUD(connection, 'login').load({
		username: username,
		password: password,
	}, function(err, val) {
		console.log(val.length);
		var resdata ={
			record: '',
			status : false,
			message: 'err' 
		};
		if (val.length > 0) {
			resdata.record=val;
			resdata.status=true;
			console.log("login");
			resdata.message="Welcome to MyApplication";
			res.jsonp(resdata);
		}

		else {
			resdata.status = false;
			resdata.message = 'Wrong user name or password Or Verify your account';
			res.jsonp(resdata);
		}

	});
}
