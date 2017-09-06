window.requestAnimationFrame(loop);
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var cats = 0;
var owneditems = [0,0,0,0,0];
var itemprice = [50,500,5000,10000,100000];
var itemname = ["Kitten","Cat","Cat family","Nekomimi","Catman"];
var itemcps = [0.5,5,25,100,500];

c.fillStyle = "black";
c.fillText("CATS: "+cats);

function loop(){
  c.fillStyle = "light-blue";
  c.fillRect(0,0,640,800);
  window.requestAnimationFrame(loop);
  
  for(var i = 0; i < owneditems.length; i++){
    c.fillStyle = "rbg(0,i*50,i*58)";
    c.fillRect(600, 200+(75*i),175,50);
    c.fillText(itemname[i], 600, 205+(75*i));
    c.fillText("Owned: "+owneditems[i], 600, 250+(75*i));
  }
}

function persecond(){
  for(var i = 0; i < onwneditems.length; i++){
    cats+=(owneditems[i]*itemcps[i]);
  }
}

window.setInterval(persecond,1000);
