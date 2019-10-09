var socket = io.connect('http://10.0.0.1:3000');
var message = document.getElementById('url');
var btn = document.getElementById('sendBtn');
var ansv = document.getElementById('videoee');
var connection = document.getElementById('connection_label');

function btnclick(){
  //alert("Hei");
  //var json = {"message": message.value};
  //socket.send(JSON.stringify(json));
  socket.emit('message', {
      message: message.value
  });
}
/*socket.onmessage = function(event){
  alert("jojo");
  var json = JSON.parse(event.data);
  var melding = json.message;
  var a1 = document.createElement("P");
  var d1 = document.createTextNode(melding);
  a1.appendChild(d1);
  ansv.appendChild(a1);
}*/

socket.on('message', function(data){
  ansv.innerHTML += '<p>'+data.message+'</p>';
});

/*$(function(){
  //var chat = $('#chat');
  //var ws = new WebSocket("ws://158.38.182.86:3001");
  var ws = new WebSocket("ws://10.0.0.1:3001");
  ws.onerror = function(msg) {
    console.log(msg);
    $("#connection_label").html("Not connected");
  };

  ws.onopen = () => {
    $("#connection_label").html("Connected");
  };
  ws.onmessage = (event) => {
    var json = JSON.parse(event.data);
    var melding = json.melding;

    /*var ifram = document.createElement("iframe");
    ifram.width = "560"; ifram.height = "315"; ifram.src = melding; ifram.frameborder = "0";
    ifram.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ifram.allowfullscreen;
    var p = document.createElement("p");

    var d3 = document.createTextNode(melding);
    p.appendChild(d3);
    var chat = document.getElementById("videoee");
    chat.appendChild(d3);

  }
  $('#sendButton').click(() => {
    alert("Button clicked!")
    var url = $('#url');
    if(url.val()){
      var json = {"url": url.val()};
      ws.send(JSON.stringify(json));
    }
  });
  /*$('#textfield').keypress(function(e){
      if(e.keyCode==13){
        $('#sendButton').click();
        e.preventDefault();
      }
    });
});*/
