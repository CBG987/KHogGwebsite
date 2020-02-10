var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var mysql = require('mysql');
var session = require('express-session');
var fs = require('fs');
var util = require('util');
var io = require('socket.io').listen(http);
var Stopwatch = require('timer-stopwatch');
var stopwatch = new Stopwatch();


var con;
function handleDisconnect(){
	con = mysql.createConnection({
		host     : 'localhost',
		user     : 'kingkong',
		password : 'BonesGravseth2',
		database : 'kvaalhogg'
	});
	con.connect(function(err){
		if(err){
				console.log('error when connecting to db:', err);
				setTimeout(handleDisconnect, 2000);
		}
		console.log("Connected!");
		getInfo();
	});
	con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {

      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));


//Resultatservice
var i = 0;
var resultat = [];
io.on('connection', function(socket){
  console.log('a user connected');
	stopwatch.onTime(function(t) {
		var times = msToTime(t.ms);
		io.emit('timer', times);
	});
	for (var i = 0; i < resultat.length; i++) {
		socket.emit('resultToWeb', resultat[i]);
	}
	socket.on('message', (message) => {
		console.log(message);
		//io.emit('message', message)
	});
	socket.on('result', (message) => {
		console.log(message);
		resultat.push(message);
		io.emit('resultToWeb', message);
	});
	socket.on('join', function(joiner) {
		console.log("The joiner is: "+joiner);
	});
	socket.on('startdetect', function(start) {
		console.log(start);
		io.emit('start','Start');
		stopwatch.start();
	});
	socket.on('disconnect', function() {
		console.log("User disconnected");
	});
	//Her kommer serverstyring
	//Sletter og lager tabeller
	/*socket.on('delAndCreateTable', function(){

	});
	//resetter klokken
	socket.on('resetClock', function(){
		stopwatch.stop();
		stopwatch.reset();
	});*/
});
//Påmeldingside for personer
app.get('/paamelding', function(req, res){
	res.sendFile(path.join(__dirname + '/public/paamelding.html'));
});
//Se liveresultater
app.get('/liveresults', function(req, res){
	res.sendFile(path.join(__dirname + '/public/resultservice.html'));
});
//Kontrollering av systemer
app.get('/mastercontrol', function(req, res){
  res.sendFile(path.join(__dirname + '/public/mastercontrol.html'));
});
//Legge inn påmelding i databasen
app.post('/paameldPerson', (req, res) => {
  var theLooper = req.body.melding;
	console.log(theLooper);
	var fornavn = theLooper.forn; var etternavn = theLooper.ettern;
	var email = theLooper.klassen ; var starttid = 0; var startnummer = velgStartnummer();
	con.query('SELECT * FROM kvaalhogg.lopet', function(err, result, fields){
		if(err) throw err;
		starttid = result.length*15+15;
		console.log(result.length);
	});
	setTimeout(function(){
		con.query('INSERT INTO kvaalhogg.lopet (navn, email, startnummer, starttid) VALUES("'+fornavn+" "+etternavn+'","'+email+'","'+startnummer+'","'+starttid+'")');
	}, 250);
});
//Mulighet for nedlastning av deltakere til excel fil
app.post('/exceldownload', (req, res) => {
	con.query('SELECT * FROM kvaalhogg.lopet', function(err, result, fields){
		if (err) throw err;
		var item = {melding: [{startnr: "", navn: "", klasse: "", starttid: ""}]};
		for (var i = 0; i < result.length; i++) {
			var startnummer = result[i].startnummer;
			var navn = result[i].navn;
			var klasse = result[i].email;
			var starttid = result[i].starttid;
			var tekst = {startnr: startnummer, navn: navn, klasse: klasse, starttid: starttid};
			item["melding"].push(tekst);
		}
		console.log(item);
		res.json(item);
	});
});
app.post('/deleteDBTable', (req, res) => {
	con.query('drop table kvaalhogg.lopet', function(err, result, fields){
		if(err) console.log("Denne eksisterer ikke");
	});
});
app.post('/createDBTable', (req, res) => {
	con.query('CREATE TABLE kvaalhogg.lopet (id int NOT NULL AUTO_INCREMENT, navn varchar(50), email varchar(50), startnummer int(100), starttid varchar(20), PRIMARY KEY(id))', function(err, result, fields){
		if(err) console.log("Denne er her");
	});
});
app.post('/stopServerClock', (req, res) => {
	stopwatch.stop();
});
app.post('/resetServerClock', (req, res) => {
	stopwatch.reset();
});
app.post('/cleanResults', (req, res) => {
	resultat = [];
	res.redirect(req.get('referer'));
	//res.json({melding: "HeiHei"})
});


//"/action_page.php"
/*app.post('/action_page', (req, res) => {
  console.log(req.body.melding);
});*/




function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
//Legg inn tilgjenlige startnummer i denne listen
var numberArray = [55,56,57,58,59];

function velgStartnummer(){
	var randomNumber = Math.floor(Math.random()*numberArray.length);
	var item = numberArray[randomNumber];
	numberArray.splice(randomNumber, 1);
	return item;
}

/////////////////////////////////////////////
//Testing of website
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
//Updates password
/*app.post('/changepassword', function(req, res){

	res.redirect('/changeinfo')
});*/
//Updates user
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

var server = http.listen(3000, () => {
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
