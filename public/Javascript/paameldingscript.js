$(document).ready(() => {
  document.getElementById("something").style.display = "none";
});
var i = 0;
function doprogress(){
  if (i == 0) {
    i = 0;
    var elem = document.getElementById("myBar");
    var eleme = document.getElementById("myProgress");
    var width1 = 10;
    var id = setInterval(frame, 20);
    function frame(){
      if (width1 >= 100) {
        eleme.innerHTML = "Du er påmeldt"
        document.getElementById("info").style.display = "none";
        clearInterval(id);
        i = 0;
      }else {
        width1++;
        elem.style.width = width1+"%";
      }
    }
  }
}
function addPerson(){
  var fornavn = document.getElementById("fornavn");
  var etternavn = document.getElementById("etternavn");
  var klasse = document.getElementById("hvilkenKlasse");
  if(fornavn.value == "" || etternavn.value == ""){
    document.getElementById("warn").style.color = "#ff0000";
    document.getElementById("warn").innerHTML = "Du må legge inn fornavn og etternavn";
  }else {
    document.getElementById("something").style.display = "block";
    document.getElementById("warn").innerHTML = "";
    var data = {
      forn: fornavn.value, ettern: etternavn.value, klassen: klasse.value
    };
    $.post('/paameldPerson', {melding: data});
    doprogress();
  }
}
