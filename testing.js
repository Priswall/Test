window.reequestanimationframe(loop);
var canvas = document.getElementById("canvas");
canvas.getContext("2d");

var cats = 0;
var owneditems = [0,0,0,0,0];

c.fillStyle = "black";
c.fillText("CATS: "+cats);

function loop(){
  c.fillStyle = "light-blue";
  c.fillRect(0,0,640,800);
}
