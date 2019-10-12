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
var object1; var object2; var fakedatabase;
con.connect(function(err){
	if(err) throw err;
	console.log("Connected!");
	con.query('SELECT * FROM kvaalhogg.komite', function(err, result, fields){
		if(err) throw err;
		object1 = {name: result[0].name, birthdate: result[0].birthdate,
								address: result[0].address, about: result[0].about};
		object2 = {name: result[1].name, birthdate: result[1].birthdate,
								address: result[1].address, about: result[1].about};
		fakedatabase = {'Christian': object1, 'Blinge': object2};
		//console.log(database);
	});
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

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
var server = app.listen(3000, () => {
  console.log('Server is running on PORT:',3000);
});

app.post('/videoes-add', (req, res) => {
  console.log(addVideo(req));
  //res.send('<p>'+req.body.url+'</p>');
  //res.redirect('/otherthings');
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
