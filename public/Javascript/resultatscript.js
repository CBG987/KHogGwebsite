
$(document).ready(() => {
var leggTil = document.getElementById("adder");
var index = 0;
$(function () {
  var socket = io();
  socket.on('timer', function(msg){
      document.getElementById("chronotime").innerHTML = msg;
  });
  socket.on('resultToWeb', function(msg){
    console.log(msg);
    var str = msg;
    var newMelding = msg.split('//');
    console.log(newMelding[0]);
    console.log(newMelding[4]);
    var t = document.createElement("tr");
    var t1 = document.createElement("th");
    var t2 = document.createElement("th");
    var t3 = document.createElement("th");
    var t4 = document.createElement("th");
    if (index == 1) {
      t.style.background = "#ffffff";
      index = 0;
    }else if (index == 0) {
      t.style.background = "#cccccc";
      index = 1;
    }

    /*var tiden = newMelding[4].split(":");
    var nyTid = 0;
    if (tiden.length > 2){
      var tid1 = parseInt(tiden[1]);
      var tid2 = parseInt(tiden[2]);
      if (tid1<10) {
        nyTid = tiden[0]+":0"+tiden[1];
      }else {
        nyTid = tiden[0]+":"+tiden[1];
      }
      if (tid2<10) {
        nyTid = tiden[1]+":0"+tiden[2];
      }else {
        nyTid = tiden[1]+":"+tiden[2];
      }
    }else if (tiden.length == 2) {
      var tid = parseInt(tiden[1]);
      if (tid<10) {
        nyTid = tiden[0]+":0"+tiden[1];
      }else {
        nyTid = newMelding[4];
      }
    }*/


    var n1 = document.createTextNode(newMelding[1]);
    var n2 = document.createTextNode(newMelding[0]);
    var n3 = document.createTextNode("--");
    //var n4 = document.createTextNode(nyTid);
    var n4 = document.createTextNode(newMelding[4]);

    t1.appendChild(n1);
    t2.appendChild(n2);
    t3.appendChild(n3);
    t4.appendChild(n4);

    t.appendChild(t1);
    t.appendChild(t2);
    t.appendChild(t3);
    t.appendChild(t4);

    leggTil.appendChild(t);
  });
});
});
