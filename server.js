var express = require('express'), path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', express.static(__dirname + '/www'));
app.use('/api', express.static(__dirname + '/api'));

var api = require('./api/trial.js');

app.post('/api/addUser', api.addUser);

app.get('/api/listUser' , api.listUser);

app.post('/api/updateuser' , api.updateuser);

app.post('/api/deluser', api.deluser);

app.post('/api/loginuser', api.loginuser)
/*app.post('api/deleteuser', api.deleteuser);*/
//app.get('api/')


app.listen(3000);
console.log('Listening.. on port...3000');