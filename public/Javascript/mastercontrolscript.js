function deleteDBTable(){
  $.post('/deleteDBTable', {});
}
function makeDBTable(){
  $.post('/createDBTable', {});
}
function stoppClock(){
  $.post('/stopServerClock', {});
}
function resetClock(){
  $.post('/resetServerClock', {});
}
function removePartisipants(){
  $.post('/cleanResults', {});
}
