var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.font = "20px Arial";

var cats = 0;
var cps = 0;
var clickamount = 1;
var clicks = 0;
var owneditems = [0,0,0,0,0];
var Cats = [];
var Prints = [];
var itemprice = [50,500,5000,10000,100000];
var itemname = ["Kitten","Cat","Cat family","Nekomimi","Catman"];
var itemcps = [0.5,5,25,100,500];
var preventspam = true;

function checkTotal(){
  
  if(Prints.length >= 100){
    Prints.splice( 0, 100 );
    Cats.push( new Cat() );
  }
	
}

function loop(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  c.fillStyle = "lightblue";
  c.fillRect( 0, 0, canvas.width, canvas.height );
  
  for( var i = 0; i < owneditems.length; i++ ){
    cps = ( itemcps[0] * owneditems[0] ) + ( itemcps[1] * owneditems[1] ) + ( itemcps[2] * owneditems[2] ) + ( itemcps[3] * owneditems[3] ) + ( itemcps[4] * owneditems[4] );
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
  
  c.font = ( canvas.height / 20 ) + "px Arial";
  c.fillStyle = "black";
  c.fillText( "CATS: " + cats, canvas.width / 2, canvas.height / 10 );
  
  for( var i = 0; i < Cats.length; i++ ){
    Cats[i].show();
  }
  for( var i = 0; i < Prints.length; i++ ){
    Prints[i].show();
  }
  
  checkTotal();
  
  window.requestAnimationFrame(loop);
}

function persecond(){
  cats += cps;
  for( var i = 0; i < Math.floor( cps ); i++ ){
     Prints.push( new Print() );
  }
}

function Cat() {
  this.x = Math.round( Math.random() * ( ( canvas.width / 3 ) *2 ) );
  this.y = Math.round( Math.random() * canvas.height );
  
  this.newR = Math.round( Math.random() * 255 );
  this.newG = Math.round( Math.random() * 255 );
  this.newB = Math.round( Math.random() * 255 );
  
  this.show = function(){
    
    var imgd = c.getImageData( 0, 0, 17, 17 );
    var imd = imgd.data;
    for ( var i = 0; i < imd.length; i += 4 ){
      if( imd[i] == 255 && imd[i+1] == 0 && imd[i+2] == 0 ){
          imd[i] = this.newR;
          imd[i+1] = this.newG;
          imd[i+2] = this.newB;
      }
    }
    c.putImageData(imgd,0,0);
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
        Cats.push( new Cat() );
        for(var j = 0; j < itemprice[i]; j++){
          Prints.splice(Prints.length - 1, 1);
        }
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

var Print = function(){
  this.x = Math.round( Math.random() * ( ( canvas.width / 3 ) *2 ) );
  this.y = Math.round( Math.random() * canvas.height );
  this.showX = this.x;
  this.showY = this.y;
  
  this.update  = function(mouseX, mouseY){
    if( mouseX > this.showX && mouseY > this.showY && mouseX < this.showX + 11 && mouseY < this.showY + 9 ){
      this.showX = mouseX;
      this.showY = mouseY;
    } else {
      this.showX -= ( this.x - this.showX );
      this.showY -= ( this.y - this.showY );
    }
  };
	
  this.show = function(){
    printt.draw(c, this.showX, this.showY);
  };
};

function save() {
  prompt("Copy this code and keep it safe to continue your progress:", owneditems[0] + "," + owneditems[1] + "," + owneditems[2] + "," + owneditems[3] + "," + owneditems[4] + "," + itemprice[0] + "," + itemprice[1] + "," + itemprice[2] + "," + itemprice[3] + "," + itemprice[4] + "," + cats);
}

function load(){
	var j = prompt("Paste your code in the box belox: ");
	var k = j.split(",");
  for(var i = 0; i < owneditems.length; i++){
    owneditems[i] = k[i];
    itemprice[i] = k[i + 5];
  }
  cats = k[k.length - 1];
}

canvas.addEventListener( "click", mouseclicked );

window.setInterval( persecond, 1000 );
window.requestAnimationFrame( loop );
