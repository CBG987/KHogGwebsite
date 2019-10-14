$(document).ready(() => {
  var img1 = document.createElement('img');
  img1.style.width = "200px"; img1.style.height = "200px";
  var img2 = document.createElement('img');
  img2.style.width = "200px"; img2.style.height = "200px";
  var img3 = document.createElement('img');
  img3.style.width = "200px"; img3.style.height = "200px";
  var img4 = document.createElement('img');
  img4.style.width = "200px"; img4.style.height = "200px";
  var img5 = document.createElement('img');
  img5.style.width = "200px"; img5.style.height = "200px";
  var img6 = document.createElement('img');
  img6.style.width = "200px"; img6.style.height = "200px";

  $.ajax({
    url: 'about',
    type: 'POST',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      console.log(data.Christian.imag);

      img1.src = '../bilder/christian.jpg'; $('#imgC').append(img1);
      img2.src = '../bilder/blinge.jpg'; $('#imgB').append(img2);
      img3.src = '../bilder/veronica.jpg'; $('#imgV').append(img3);
      img4.src = '../bilder/siw.jpg'; $('#imgSiw').append(img4);
      img5.src = '../bilder/steffen.jpg'; $('#imgS').append(img5);
      img6.src = '../bilder/petter.jpg'; $('#imgP').append(img6);

      $('#nameC').append(document.createTextNode(data.Christian.name));
      $('#nameB').append(document.createTextNode(data.Blinge.name));
      $('#nameV').append(document.createTextNode(data.Veronica.name));
      $('#nameSiw').append(document.createTextNode(data.Siw.name));
      $('#nameS').append(document.createTextNode(data.Steffen.name));
      $('#nameP').append(document.createTextNode(data.Petter.name));

      $('#birthdateC').append(document.createTextNode(date(data.Christian.birthdate)));
      $('#birthdateB').append(document.createTextNode(date(data.Blinge.birthdate)));
      $('#birthdateV').append(document.createTextNode(date(data.Veronica.birthdate)));
      $('#birthdateSiw').append(document.createTextNode(date(data.Siw.birthdate)));
      $('#birthdateS').append(document.createTextNode(date(data.Steffen.birthdate)));
      $('#birthdateP').append(document.createTextNode(date(data.Petter.birthdate)));

      $('#addressC').append(document.createTextNode(data.Christian.address));
      $('#addressB').append(document.createTextNode(data.Blinge.address));
      $('#addressV').append(document.createTextNode(data.Veronica.address));
      $('#addressSiw').append(document.createTextNode(data.Siw.address));
      $('#addressS').append(document.createTextNode(data.Steffen.address));
      $('#addressP').append(document.createTextNode(data.Petter.address));

      $('#aboutC').append(document.createTextNode(data.Christian.about));
      $('#aboutB').append(document.createTextNode(data.Blinge.about));
      $('#aboutV').append(document.createTextNode(data.Veronica.about));
      $('#aboutSiw').append(document.createTextNode(data.Siw.about));
      $('#aboutS').append(document.createTextNode(data.Steffen.about));
      $('#aboutP').append(document.createTextNode(data.Petter.about));
    }
  });
});
function date(birthdate){
  var dato = birthdate.split('-');
  return moment(dato, 'DDMMYYYY').locale('nb').format('LL')+" ("+age(dato)+")";
}
function age(date2){
    //var date2 = String(date1[0]+date1[1]+date1[2]);
    var age = moment().diff(moment(date2, 'DDMMYYYY'), 'years');
    return age+" år";
}
