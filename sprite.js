var cat = [],
    printt;

var Sprite = function( img, x, y, w, h ){
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  
  this.draw = function(c, x, y){
    c.drawImage( this.img, this.x, this.y, this.w, this.h, x, y, this.w, this.h );
  };
};

function makeSprites( img ){

  cat = [
    new Sprite( img, 0, 0, 17, 17 ),
    new Sprite( img, 18, 0, 17, 17 ),
    new Sprite( img, 27, 0, 17, 17 ),
  ];
  
  printt = new Sprite( img, 52, 0, 11, 9 );

}

var img = new DragImage();
img.onload = function(){ makeSprites( this ) };;
img.src = "res/cats.png";
