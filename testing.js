var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.font = "20px Arial";

var cats = 0;
var owneditems = [0,0,0,0,0];
var itemprice = [50,500,5000,10000,100000];
var itemname = ["Kitten","Cat","Cat family","Nekomimi","Catman"];
var itemcps = [0.5,5,25,100,500];


function loop(){
  c.fillStyle = "lightblue";
  c.fillRect(0,0,640,800);
  
  for(var i = 0; i < owneditems.length; i++){
    c.fillStyle = "rgb(0,"+(100+(i*30))+","+(100+(i*30))+")";
    c.fillRect(400, 200+(75*i),175,50);
    c.fillStyle = "black";
    c.font = "20px Arial";
    c.fillText(itemname[i], 400, 230+(75*i));
    c.font = "10px Arial";
    c.fillText("Owned: "+owneditems[i], 400, 255+(75*i));
  }
  
  c.fillStyle = "black";
  c.fillText("CATS: "+cats, 500+(cats*8),50);
  
  window.requestAnimationFrame(loop);
}

function persecond(){
  for(var i = 0; i < owneditems.length; i++){
    cats+=(owneditems[i]*itemcps[i]);
  }
}

window.setInterval(persecond,1000);
window.requestAnimationFrame(loop);
