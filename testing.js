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
    c.font = ( canvas.height / 30 ) + "px Arial";
    c.fillText( itemname[i], ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 12 ), ( ( canvas.height / 3 ) + ( canvas.height / 24 ) )+ ( ( canvas.height / 8 ) * i ) );
    c.font = ( canvas.height / 20 ) + "px Arial";
    c.fillText( "Owned: " + owneditems[i], ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 12 ), ( ( canvas.height / 3 ) + ( canvas.height / 12 ) )+ ( ( canvas.height / 8 ) * i ) );
  }
  
  c.fillStyle = "rgb( 0, 255, 255 )";
  c.fillRect( ( canvas.width / 3 ) * 2, 0, canvas.width / 3, canvas.height / 3 );
  
  c.fillStyle = "black";
  c.fillText( "CATS: " + cats, canvas.width / 2 - ( cats * ( canvas.height / 10 ) ), canvas.height / 10 );
  
  window.requestAnimationFrame(loop);
}                            // End Loop

function persecond(){
  for( var i = 0; i < owneditems.length; i++ ){
    cats+=(owneditems[i]*itemcps[i]);
  }
}

function mouseclicked(e) {
  for( var i = 0; i < owneditems.length; i++ ){
    if( e.clientY < ( ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) ) + ( canvas.height / 16 ) && e.clientY > ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) && e.clientX > ( canvas.width / 3 ) * 2 && e.clientX < ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 3 ) - ( canvas.width / 8 ) ){
      if( cats >= itemprice[i] ){
        cats -= itemprice;
        itemprice += Math.floor( ( 0.6 * owneditems[i] ) + ( 0.4 * owneditems[i] ) );
      } else {
        //Insert easter egg here
      }
    } else if( e.clientX > ( canvas.width / 3 ) * 2 && e.clientX < canvas.width && e.clientY > 0 && e.clientY < canvas.height / 3 ){
      cats += clickamount;
      clicks++;
    }
  }
}

function mousemoved(e) {
  
  for( var i = 0; i < owneditems.length; i++ ){
    if( e.clientY < ( ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) ) + ( canvas.height / 16 ) && e.clientY > ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) && e.clientX > ( canvas.width / 3 ) * 2 && e.clientX < ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 3 ) - ( canvas.width / 8 ) ){
      canvas.syle.cursor = "pointer";
    } else{
      canvas.style.cursor = "auto";
    }
    
  }
}

window.addEventListener("click",mouseclicked);
window.addEventListener("mousemove",mousemoved);

window.setInterval(persecond,1000);
window.requestAnimationFrame(loop);
