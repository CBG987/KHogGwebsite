var express = require('express');
var bodyParser = require('body-parser');
var ws = require('ws');
var app = express();
var http = require('http');
var path = require('path');
var socket = require('socket.io')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/awaiting', function(req, res){
  res.sendFile(path.join(__dirname + '/public/awaitingEvents.html'));
});
app.get('/earlier', function(req, res){
  res.sendFile(path.join(__dirname + '/public/pastEvents.html'));
});
app.get('/about', function(req, res){
  res.sendFile(path.join(__dirname + '/public/about.html'));
});
app.get('/otherthings', function(req, res){
  res.sendFile(path.join(__dirname + '/public/otherthings.html'));
});
var server = app.listen(3000, () => {
  console.log('Server is running on PORT:',3000);
});
/*var io = socket(server);
io.on('connection', function(socket){
  console.log('Opened a connection');

  socket.on('message', function(data){
    /*for(var c=0;c<io.clients.length;c++) {
      io.clients[c].send(message);
    }
    console.log('onMessage');
    io.sockets.emit('message', data+"Hei");
  });

  /*socket.on('message', function(message) {
    console.log("message: "+message);

    for(var c=0;c<ws_server.clients.length;c++) {
      ws_server.clients[c].send(addVideo(message));
    }
  });

  socket.on('close', () => {
    console.log("Closed a connection");
  });

  socket.on('error', (error) => {
    console.error("Error: "+error.message);
  });*/
//});

app.post('/videoes-add', (req, res) => {
  console.log(addVideo(req));
  res.send('<p>'+req.body.url+'</p>');
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
