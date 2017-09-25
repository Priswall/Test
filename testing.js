var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
c.font = "20px Arial";

var cats = 0;
var clickamount = 1;
var clicks = 0;
var owneditems = [0,0,0,0,0];
var Cats = [];
var Prints = [];
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
  
  c.font = ( canvas.height / 20 ) + "px Arial";
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
  
  this.show = function(){
    printt.draw(c, this.x, this.y);
  };
};

/*if( localStorage.cats ){
  cats = localStorage.cats;
} else {
  localStorage.cats = 0;
}

if( localStorage.clicks ){
  clicks = Number( localStorage.clicks );
} else {
  localStorage.clicks = 0;
}

if( localStorage.owneditems ){
  for( var i = 0; i < localStorage.owneditems.length; i++ ){
      owneditems[i] = localStorage.owneditems[i];
  }
  for( var i = 0; i < owneditems.length; i++ ){
    for( var j = 0; j < owneditems[j]; j++ ){
      itemprice[i] = owneditems[i] + 1.1;
    }
    switch ( i ) {
      case 0:
        for( var i = 0; i < owneditems[0]; i++ ){
          Prints.push( new Print() );
        }
        break;
      case 1:
        for( var i = 0; i < owneditems[1]; i++ ){
          Cats.push( new Cat() );
        }
        break;
    }
  }
} else {
  localStorage.owneditems = "0 0 0 0 0";
}*/

canvas.addEventListener( "click", mouseclicked );

window.setInterval( persecond, 1000 );
window.requestAnimationFrame( loop );
//window.setInterval( function(){
//  localStorage.clicks = clicks;
//  localStorage.cats = cats;
//  localStorage.owneditems = owneditems[0] + owneditems[1] + owneditems[2] + owneditems[3] + owneditems[4];
//}, 30000 );
