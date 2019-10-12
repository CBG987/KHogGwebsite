$(document).ready(() => {
  //var christiandiv = document.getElementById('christian');
  //var blingediv = document.getElementById('blinge');

  var imgC = document.getElementById('imgC');
  var imgB = document.getElementById('imgB');
  var imgV = document.getElementById('imgV');
  var imgSiw = document.getElementById('imgSiw');
  var imgS = document.getElementById('imgS');
  var imgP = document.getElementById('imgP');

  var nameC = document.getElementById('nameC');
  var nameB = document.getElementById('nameB');
  var nameV = document.getElementById('nameV');
  var nameSiw = document.getElementById('nameSiw');
  var nameS = document.getElementById('nameS');
  var nameP = document.getElementById('nameP');

  var birthdateC = document.getElementById('birthdateC');
  var birthdateB = document.getElementById('birthdateB');
  var birthdateV = document.getElementById('birthdateV');
  var birthdateSiw = document.getElementById('birthdateSiw');
  var birthdateS = document.getElementById('birthdateS');
  var birthdateP = document.getElementById('birthdateP');

  var addressC = document.getElementById('addressC');
  var addressB = document.getElementById('addressB');
  var addressV = document.getElementById('addressV');
  var addressSiw = document.getElementById('addressSiw');
  var addressS = document.getElementById('addressS');
  var addressP = document.getElementById('addressP');

  var aboutC = document.getElementById('aboutC');
  var aboutB = document.getElementById('aboutB');
  var aboutV = document.getElementById('aboutV');
  var aboutSiw = document.getElementById('aboutSiw');
  var aboutS = document.getElementById('aboutS');
  var aboutP = document.getElementById('aboutP');

  $.ajax({
    url: 'about',
    type: 'POST',
    dataType: 'json',
    success: (data) => {
      console.log(data);
      nameC.appendChild(document.createTextNode(data.Christian.name));
      nameB.appendChild(document.createTextNode(data.Blinge.name));

      birthdateC.appendChild(document.createTextNode(data.Christian.birthdate));
      birthdateB.appendChild(document.createTextNode(data.Blinge.birthdate));

      addressC.appendChild(document.createTextNode(data.Christian.address));
      addressB.appendChild(document.createTextNode(data.Blinge.address));

      aboutC.appendChild(document.createTextNode(data.Christian.about));
      aboutB.appendChild(document.createTextNode(data.Blinge.about));
    }
  });
});
