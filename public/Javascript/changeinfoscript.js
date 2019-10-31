//var jsonFind = require('json-find');
var navn = document.getElementById('navn');
var email = document.getElementById('email');
var fødselsdato = document.getElementById('birthdate');
var adresse = document.getElementById('address');
var om = document.getElementById('about');
var date = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16',
            '17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
var month = ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September',
              'Oktober','November','Desember'];
var yearRangeStart = 1930; var yearRangeStop = 2012;
//var year = range(1930, 2012);
var datas; var id;
$(document).ready(() => {
  $.ajax({
    url: 'changeinfo',
    type: 'POST',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      datas = data;
      printDay(date); printMonth(month); printYear(range(yearRangeStart, yearRangeStop));
    }
  });
});
/*String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}*/
function saveUserPassword(){
  var userBase = datas.Userbase;
  var username = document.getElementById('username').value;
  var user = username[0].toUpperCase()+ username.slice(1)+"User";
  var oldPassword = document.getElementById('oldpassword');
  var newPassword = document.getElementById('passord');
  var newPasswordagian = document.getElementById('passord');
  /*for(var i = 0; i<datas[0].len; i++){
    if(datas[0][i][username] == username){
      console.log("fant bruker");
    }
  }*/
  //var doc = jsonFind(datas);
  //console.log(doc.checkKey('Userbase'));
  console.log(username);
  console.log(user);
  if(userBase.list[user][username] == username){
    console.log("fant bruker");
  }

  //$.post('/saveUserPassword', {melding: data});
}
//Change user
function saveUserButton(){
  var name = document.getElementById('navn');
  var email = document.getElementById('email');
  var day = document.getElementById('date');
  var month = document.getElementById('month');
  var year = document.getElementById('year');
  var birthdate; var monthvalue = parseInt(month.value)+1; var dayvalue = parseInt(day.value)+1;
  if(monthvalue<=9){
    if(dayvalue<=9){
      birthdate = "0"+dayvalue+"-0"+monthvalue+"-"+range(yearRangeStart, yearRangeStop)[year.value];
    }else {
      birthdate = dayvalue+"-0"+monthvalue+"-"+range(yearRangeStart, yearRangeStop)[year.value];
    }
  }else {
    if(dayvalue<=9){
      birthdate = "0"+dayvalue+"-"+monthvalue+"-"+range(yearRangeStart, yearRangeStop)[year.value];
    }else {
      birthdate = dayvalue+"-"+monthvalue+"-"+range(yearRangeStart, yearRangeStop)[year.value];
    }
  }
  var address = document.getElementById('address');
  var about = document.getElementById('about');
  var data = {
    id: id, name: name.value, email: email.value,
    birthdate: birthdate, address: address.value, about: about.value
  };
  console.log(birthdate);
  console.log(data);
  $.post('/saveUser', {melding: data});
  window.location.reload();
}
function clickedC(){
  id = datas.Aboutbase.Christian.id;
  document.getElementById('navn').value = datas.Aboutbase.Christian.name;
  document.getElementById('email').value = datas.Userbase.ChristianUser.eaddress;
  findBirtday(datas.Aboutbase.Christian.birthdate);
  document.getElementById('address').value = datas.Aboutbase.Christian.address;
  document.getElementById('about').value = datas.Aboutbase.Christian.about;
}
function clickedB(){
  id = datas.Aboutbase.Blinge.id;
  document.getElementById('navn').value = datas.Aboutbase.Blinge.name;
  document.getElementById('email').value = datas.Userbase.BlingeUser.eaddress;
  findBirtday(datas.Aboutbase.Blinge.birthdate);
  document.getElementById('address').value = datas.Aboutbase.Blinge.address;
  document.getElementById('about').value = datas.Aboutbase.Blinge.about;
}
function clickedV(){
  id = datas.Aboutbase.Veronica.id;
  document.getElementById('navn').value = datas.Aboutbase.Veronica.name;
  document.getElementById('email').value = datas.Userbase.VeronicaUser.eaddress;
  findBirtday(datas.Aboutbase.Veronica.birthdate);
  document.getElementById('address').value = datas.Aboutbase.Veronica.address;
  document.getElementById('about').value = datas.Aboutbase.Veronica.about;
}
function clickedSiw(){
  id = datas.Aboutbase.Siw.id;
  document.getElementById('navn').value = datas.Aboutbase.Siw.name;
  document.getElementById('email').value = datas.Userbase.SiwUser.eaddress;
  findBirtday(datas.Aboutbase.Siw.birthdate);
  document.getElementById('address').value = datas.Aboutbase.Siw.address;
  document.getElementById('about').value = datas.Aboutbase.Siw.about;
}
function clickedS(){
  id = datas.Aboutbase.Steffen.id;
  document.getElementById('navn').value = datas.Aboutbase.Steffen.name;
  document.getElementById('email').value = datas.Userbase.SteffenUser.eaddress;
  findBirtday(datas.Aboutbase.Steffen.birthdate);
  document.getElementById('address').value = datas.Aboutbase.Steffen.address;
  document.getElementById('about').value = datas.Aboutbase.Steffen.about;
}
function clickedP(){
  id = datas.Aboutbase.Petter.id;
  document.getElementById('navn').value = datas.Aboutbase.Petter.name;
  document.getElementById('email').value = datas.Userbase.PetterUser.eaddress;
  findBirtday(datas.Aboutbase.Petter.birthdate);
  document.getElementById('address').value = datas.Aboutbase.Petter.address;
  document.getElementById('about').value = datas.Aboutbase.Petter.about;
}
function range(yearfrom, yearto){
  var years = []
  for(var i = 0; i<(yearto+1-yearfrom); i++){
    years[i] = yearfrom+i;
  }
  return years.reverse();
}
function findBirtday(birthdate){
  var date = birthdate.split('-');
  $('#date').val(date[0]-1);
  $('#month').val(date[1]-1);
  $('#year').val(yearRangeStop-date[2]);
}
function printDay(array){
  var select = document.getElementById('date');
  for(var i = 0; i<array.length; i++){
    select.options[select.options.length] = new Option(array[i], i);
  }
}
function printMonth(array){
  var select = document.getElementById('month');
  for(var i = 0; i<array.length; i++){
    select.options[select.options.length] = new Option(array[i], i);
  }
}
function printYear(array){
  var select = document.getElementById('year');
  for(var i = 0; i<array.length; i++){
    select.options[select.options.length] = new Option(array[i], i);
  }
}
