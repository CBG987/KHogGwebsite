
function indexpage(){
  var file = 'index.html';
  $("#page").load(file);
  history.pushState(null, null, file);
}
function aboutpage(){
  var file = 'about.html';
  $("#page").load(file);
  history.pushState(null, null, file);
}
function videopage(){
  var file = 'videoes.html';
  $("#page").load(file);
  history.pushState(null, null, file);
}
function addVideo(){
  var inputurl = document.getElementById("url").value;
  var one = inputurl.split("&");
  var two = one[0].split('watch?v=');
  var three = (two[0]+two[1]).split('/');
  var newurl = three[0]+"//"+three[1]+three[2]+"/embed/"+three[3];
  //alert(newurl);
  $('#videoee').append('<iframe width="560" height="315" src="' + newurl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  //var code = '<iframe width="560" height="315" src="https://www.youtube.com/embed/1Qpo9Nuvqu8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  //diven.appendChild(code);
  /*var ifram = document.createElement('iframe');
  ifram.width = "560";
  ifram.height = "315";
  //ifram.src = ""+url+"";
  ifram.frameborder = "0";
  ifram.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  ifram.allowfullscreen;
  alert("Hello");
  diven.appendChild(ifram);*/
}
