$(document).ready(() => {
  var videoDiv = document.getElementById('videoer');
  var videoUrl = ["https://www.youtube.com/embed/UiDmd4FtYII", "https://www.youtube.com/embed/goR8GVtFzME",
                  "https://www.youtube.com/embed/1Qpo9Nuvqu8"];

  for(var i = 0; i<videoUrl.length; i++){
    videoDiv.appendChild(prepareFrame(videoUrl[i]));
  }
});
function prepareFrame(url) {
  var ifrm = document.createElement("IFRAME");
  ifrm.setAttribute("src", url);
  ifrm.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
  ifrm.setAttribute("allowfullscreen","");
  ifrm.frameborder = 20;
  ifrm.style.width = "560px";
  ifrm.style.height = "315px";
  return ifrm;
}
