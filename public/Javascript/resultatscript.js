var wbout;
$.ajax({
  url: 'exceldownload',
  type: 'POST',
  dataType: 'json',
  success: (datas) => {
    hent(datas);
  }
});
$.ajax({
  url: 'cleanResults',
  type: 'POST',
  dataType: 'json',
  success: (mes) => {
    console.log('HEIHEIHerErJeg');
    document.getElementById("adder").deleteRow(0);
  }
});
function hent(data){
  console.log(data);
  var wb = XLSX.utils.book_new();
  //var today = new Date();
  wb.Props = {
    Author: "Christian Gravseth"
  };
  //new Date(today.getFullYear(),today.getMonth()+1,today.getDate())
  wb.SheetNames.push("theSheet");
  var len = data.melding.length;
  console.log(data.melding);
  var ws_data = [['hello' , 'world']];
  for (var i = 1; i < len; i++) {
    ws_data[[i]] = [data.melding[i].startnr, data.melding[i].navn, data.melding[i].klasse, data.melding[i].starttid];
    /*ws_data[[i]] = data.melding[i].navn;
    ws_data[[i]] = data.melding[i].klasse;
    ws_data[[i]] = data.melding[i].starttid;*/
  }
  console.log(ws_data);
  var ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["theSheet"] = ws;
  wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
}
function s2ab(s){
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
/*$("hentExcel").click(function(){
  console.log("HEIHEI");
  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
});*/
function thisClick(){
  console.log("HEIHEI");
  saveAs(new Blob([s2ab(wbout)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), 'test.xlsx');
}

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

      var n1 = document.createTextNode(newMelding[1]);
      var n2 = document.createTextNode(newMelding[0]);
      var n3 = document.createTextNode(newMelding[2]);
      //var n4 = document.createTextNode(nyTid);
      var n4 = document.createTextNode(newMelding[3]);

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
