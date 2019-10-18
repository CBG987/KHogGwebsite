var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var session = require('express-session');
var fs = require('fs');

var con = mysql.createConnection({
	host     : 'localhost',
	user     : 'kingkong',
	password : 'BonesGravseth2',
	database : 'kvaalhogg'
});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

con.connect(function(err){
	if(err) throw err;
	console.log("Connected!");
	getInfo();
});
var fakedatabase; var fakeuserbase;
function getInfo(){
	con.query('SELECT * FROM kvaalhogg.komite', function(err, result, fields){
		if(err) throw err;
		object1 = {id: result[0].id, name: result[0].name, birthdate: result[0].birthdate,
				address: result[0].address, about: result[0].about, imag: result[0].image};
		object2 = {id: result[1].id, name: result[1].name, birthdate: result[1].birthdate,
								address: result[1].address, about: result[1].about};
		object3 = {id: result[2].id, name: result[2].name, birthdate: result[2].birthdate,
								address: result[2].address, about: result[2].about};
		object4 = {id: result[3].id, name: result[3].name, birthdate: result[3].birthdate,
								address: result[3].address, about: result[3].about};
		object5 = {id: result[4].id, name: result[4].name, birthdate: result[4].birthdate,
								address: result[4].address, about: result[4].about};
		object6 = {id: result[5].id, name: result[5].name, birthdate: result[5].birthdate,
								address: result[5].address, about: result[5].about};
		fakedatabase = {'Christian': object1, 'Blinge': object2, 'Veronica': object3,
										'Siw': object4, 'Steffen': object5, 'Petter': object6};
	});
	con.query('SELECT * FROM kvaalhogg.users', function(err, result, fields){
		if(err) throw err;
		user1 = {id: result[0].id, username: result[0].username, password: result[0].password, eaddress: result[0].email};
		user2 = {id: result[1].id, username: result[1].username, password: result[1].password, eaddress: result[1].email};
		user3 = {id: result[2].id, username: result[2].username, password: result[2].password, eaddress: result[2].email};
		user4 = {id: result[3].id, username: result[3].username, password: result[3].password, eaddress: result[3].email};
		user5 = {id: result[4].id, username: result[4].username, password: result[4].password, eaddress: result[4].email};
		user6 = {id: result[5].id, username: result[5].username, password: result[5].password, eaddress: result[5].email};
		fakeuserbase = {'ChristianUser': user1, 'BlingeUser': user2, 'VeronicaUser': user3,
										'SiwUser': user4, 'SteffenUser': user5, 'PetterUser': user6};
	});
}
var databases;
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/main.html'));
});
app.get('/awaiting', function(req, res){
  res.sendFile(path.join(__dirname + '/public/awaitingEvents.html'));
});
app.get('/vol1', function(req, res){
  res.sendFile(path.join(__dirname + '/public/KHogGvol1.html'));
});
app.get('/vol2', function(req, res){
  res.sendFile(path.join(__dirname + '/public/KHogGvol2.html'));
});
app.get('/about', function(req, res){
  res.sendFile(path.join(__dirname + '/public/about.html'));
});
app.post('/about', (req, res) => {
  res.json(fakedatabase);
});
app.get('/pictures', function(req, res){
  res.sendFile(path.join(__dirname + '/public/pictures.html'));
});
app.get('/videoer', function(req, res){
  res.sendFile(path.join(__dirname + '/public/videoer.html'));
});
app.get('/login', function(req, res){
	if (req.session.loggedin) {
		res.redirect('/changeinfo');
	}else{
		res.sendFile(path.join(__dirname + '/public/login.html'));
	}
});
app.post('/login', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/changeinfo');
			} else {
				var res1 = {"Response": 'Incorrect Username and/or Password!'};
				var res2 = 'Incorrect Username and/or Password!';
				//res.sendFile(path.join(__dirname + '/public/login.html'), res1);
				res.redirect('/login');
			}
			//res.end();
		});
	} else {
		res.json('Please enter Username and Password!');
		//res.end();
	}
});
app.get('/changeinfo', function(req, res){
	if (req.session.loggedin) {
		res.sendFile(path.join(__dirname + '/public/changeinfo.html'));
	} else {
		//res.send('Please login to view this page!');
		res.redirect('/login');
	}
});
//Set infomation in changeinfo
app.post('/changeinfo', function(req, res){
	databases = {"Userbase": fakeuserbase, "Aboutbase": fakedatabase};
	res.json(databases);
});
/*app.post('/changepassword', function(req, res){

	res.redirect('/changeinfo')
});*/
app.post('/saveUser', function(req, res){
	var data = req.body.melding;
	console.log(data);
	con.query('UPDATE kvaalhogg.komite SET name = "'+data.name+'", birthdate = "'+data.birthdate+'", address = "'+data.address+'", about = "'+data.about+'" WHERE (id = "'+data.id+'")');
	con.query('UPDATE kvaalhogg.users SET email = "'+data.email+'" WHERE (id = "'+data.id+'")');
	getInfo();
	databases = {"Userbase": fakeuserbase, "Aboutbase": fakedatabase};
	res.redirect('/changeinfo')
});
//logout
app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/login');
});

var server = app.listen(3000, () => {
  console.log('Server is running on PORT:',3000);
});

app.post('/videoes-add', (req, res) => {
  console.log(addVideo(req));
});
function sendvideo(url){
  var a1 = document.createElement("P");
  var d1 = document.createTextNode(melding);
  a1.appendChild(d1);
  return a1;
}

function addVideo(req){
  var inputurl = req.body.url;
  var one = inputurl.split("&");
  var two = one[0].split('watch?v=');
  var three = (two[0]+two[1]).split('/');
  var newurl = three[0]+"//"+three[1]+three[2]+"/embed/"+three[3];
  return newurl;
}
