var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.font = "20px Arial";

var cats = 0;
var clickamount = 0;
var clicks = 0;
var owneditems = [0,0,0,0,0];
var itemprice = [50,500,5000,10000,100000];
var itemname = ["Kitten","Cat","Cat family","Nekomimi","Catman"];
var itemcps = [0.5,5,25,100,500];


function loop(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  c.fillStyle = "lightblue";
  c.fillRect( 0, 0, canvas.width, canvas.height );
  
  for( var i = 0; i < owneditems.length; i++ ){
    c.fillStyle = "rgb(0," + ( 100 + ( i * 30 ) ) + "," + ( 100 + ( i * 30 ) ) + ")";
    c.fillRect( ( canvas.width / 3 ) * 2, ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ), ( canvas.width / 3 ) - ( canvas.width / 8 ), canvas.height / 16 );
    c.fillStyle = "black";
    c.font = "20px Arial";
    c.fillText( itemname[i], ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 12 ), ( ( canvas.height / 3 ) + ( canvas.height / 24 ) )+ ( ( canvas.height / 8 ) * i ) );
    c.font = "10px Arial";
    c.fillText( "Owned: " + owneditems[i], ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 12 ), ( ( canvas.height / 3 ) + ( canvas.height / 12 ) )+ ( ( canvas.height / 8 ) * i ) );
  }
  
  c.fillStyle = "black";
  c.fillText( "CATS: " + cats, 500 + ( cats * 8 ), 50 );
  
  window.requestAnimationFrame(loop);
}                            // End Loop

function persecond(){
  for( var i = 0; i < owneditems.length; i++ ){
    cats+=(owneditems[i]*itemcps[i]);
  }
}

function mouseclicked(e) {
  for( var i = 0; i < owneditems.length; i++ ){
    if( e.clientY < 250 + ( 75 * i ) && e.clientY > 200 + ( 75 * e.clientY ) && e.clientX > 400 && e.clientX < 575 ){
      if( cats >= itemprice[i] ){
        cats -= itemprice;
        itemprice += Math.floor( ( 0.6 * owneditems[i] ) + ( 0.4 * owneditems[i] ) );
      } else {
        //Insert easter egg here
      }
    } else if( e.clientX > 475 && e.clientX < 600 && e.clientY > 40 && e.clientY < 165){
      cats += clickamount;
      clicks++;
    }
  }
}

window.addEventListener("click",mouseclicked);

window.setInterval(persecond,1000);
window.requestAnimationFrame(loop);
