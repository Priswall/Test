var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.font = "20px Arial";

var cats = 0;
var clickamount = 1;
var clicks = 0;
var owneditems = [0,0,0,0,0];
var Cats = [];
var Prints = []
var itemprice = [50,500,5000,10000,100000];
var itemname = ["Kitten","Cat","Cat family","Nekomimi","Catman"];
var itemcps = [0.5,5,25,100,500];
var preventspam = true;


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
    c.font = ( canvas.height / 40 ) + "px Arial";
    c.fillText( "Owned: " + owneditems[i], ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 12 ), ( ( canvas.height / 3 ) + ( canvas.height / 12 ) )+ ( ( canvas.height / 8 ) * i ) );
    c.fillText( "Price: " + itemprice[i], ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 12 ), ( ( canvas.height / 3 ) + ( canvas.height / 9.5 ) )+ ( ( canvas.height / 8 ) * i ) );
  }
  
  c.fillStyle = "rgb( 0, 255, 255 )";
  c.fillRect( ( canvas.width / 3 ) * 2, 0, canvas.width / 3, canvas.height / 3 );
  
  c.fillStyle = "black";
  c.fillText( "CATS: " + cats, canvas.width / 2, canvas.height / 10 );
  
  for( var i = 0; i < Cats.length; i++ ){
    Cats[i].show();
  }
  for( var i = 0; i < Prints.length; i++ ){
    Prints[i].show();
  }
  
  window.requestAnimationFrame(loop);
}                            // End Loop

function persecond(){
  for( var i = 0; i < owneditems.length; i++ ){
    cats+=(owneditems[i]*itemcps[i]);
  }
}

function Cat() {
  this.x = Math.round( Math.random() * ( ( canvas.width / 3 ) *2 ) );
  this.y = Math.round( Math.random() * canvas.height );
  
  this.newR = Math.round( Math.random() * 255 );
  this.newG = Math.round( Math.random() * 255 );
  this.newB = Math.round( Math.random() * 255 );
  
  this.show = function(){
    
    var imd = c.getImageData( 0, 0, 17, 17 );
    for ( var i = 0; i < imd.data.length; i += 4 ){
      if( imd.data[i] == 255 && imd.data[i+1] == 255 && imd.data[i+2] == 255 ){
          imd.data[i] = this.newR;
          imd.data[i+1] = this.newG;
          imd.data[i+2] = this.newB;
      }
    }
    c.putImageData(imd,0,0);
    cat[0].draw(c, this.x, this.y);
  };
}

function mouseclicked(e) {
  for( var i = 0; i < owneditems.length; i++ ){
    if( e.clientY < ( ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) ) + ( canvas.height / 16 ) && e.clientY > ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) && e.clientX > ( canvas.width / 3 ) * 2 && e.clientX < ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 3 ) - ( canvas.width / 8 ) ){
      if( cats >= itemprice[i] ){
        cats -= itemprice[i];
        owneditems[i]++;
        itemprice[i] = Math.round( itemprice[i] * 1.01 );
      } else {
        //Insert easter egg here
      }
    } else if( e.clientX > ( canvas.width / 3 ) * 2 && e.clientX < canvas.width && e.clientY > 0 && e.clientY < canvas.height / 3 ){
      if(preventspam){
        cats += clickamount;
        clicks++;
        console.log( "Clicks: " + clicks );
        preventspam = false;
        
        Prints.push( new Print() );
        
      }
    }
  }
  preventspam = true;
}

function mousemoved(e) {
  for( var i = 0; i < owneditems.length; i++ ){
    if( e.clientY < ( ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) ) + ( canvas.height / 16 ) && e.clientY > ( canvas.height / 3 ) + ( ( canvas.height / 8 ) * i ) && e.clientX > ( canvas.width / 3 ) * 2 && e.clientX < ( ( canvas.width / 3 ) * 2 ) + ( canvas.width / 3 ) - ( canvas.width / 8 ) ){
      canvas.style.cursor = "pointer";
    } else{
      canvas.style.cursor = "auto";
    }
    
  }
}

canvas.addEventListener("click",mouseclicked);
canvas.addEventListener("mousemove",mousemoved);

window.setInterval(persecond,1000);
window.requestAnimationFrame(loop);
