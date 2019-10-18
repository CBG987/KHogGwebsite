$(document).ready(() => {
  //Bildedelen
  var div1 = document.getElementById('pictures1');
  var div2 = document.getElementById('pictures2');
  for(var i=1; i<49; i++){
    img = document.createElement('img');
    img.style.width = "20%"; img.style.height = "20%";
    img.style.padding = "5px";
    img.src = '../bilder/bilderVol2/'+i+'.jpg';
    if(img.naturalWidth > img.naturalHeight) {
        div2.appendChild(img);
    } else {
        div1.appendChild(img);
    }
  }
});
