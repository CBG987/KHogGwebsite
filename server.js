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
app.get('/about', function(req, res){
  res.sendFile(path.join(__dirname + '/public/about.html'));
});
app.get('/videoes', function(req, res){
  res.sendFile(path.join(__dirname + '/public/videoes.html'));
});
app.get('/pictures', function(req, res){
  res.sendFile(path.join(__dirname + '/public/pictures.html'));
});
var server = app.listen(3000, () => {
  console.log('Server is running on PORT:',3000);
});
var io = socket(server);
io.on('connection', function(socket){
  console.log('Opened a connection');

  socket.on('message', function(data){
    /*for(var c=0;c<io.clients.length;c++) {
      io.clients[c].send(message);
    }*/
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
});

/*app.ws('/videoes', function(ws, req) {
  var server = http.createServer(app);
  var ws_server = new ws.Server({port: 3001});

});
//


/*app.post('/videoes-add', (req, res) => {
  console.log(addVideo(req));
  res.redirect('/videoes');
});*/


function addVideo(req){
  var inputurl = req.body.url;
  var one = inputurl.split("&");
  var two = one[0].split('watch?v=');
  var three = (two[0]+two[1]).split('/');
  var newurl = three[0]+"//"+three[1]+three[2]+"/embed/"+three[3];
  return newurl;
}
/*http.createServer(function (req, res) {
  //var q = url.parse(req.url, true);
  var filename = "." + req.url;
  if (filename == './') {
        filename = './index.html';
    }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);*/
