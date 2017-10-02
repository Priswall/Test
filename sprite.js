var cat = [],
    printt,
    buttton,
    icons = [];

var Sprite = function( img, x, y, w, h ){
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  
  this.draw = function(c, x, y, w, h){
    if(w == null){
      c.drawImage( this.img, this.x, this.y, this.w, this.h, x, y, this.w, this.h );
        return;
    }else{
      c.drawImage( this.img, this.x, this.y, this.w, this.h, x, y, w, h );
        return;
    }
  };
};

function makeSprites( img ){

  cat = [
    new Sprite( img, 0, 0, 17, 17 ),
    new Sprite( img, 18, 0, 17, 17 ),
    new Sprite( img, 27, 0, 17, 17 )
  ];
  
  printt = new Sprite( img, 52, 0, 11, 9 );
    
  icons = [
    new Sprite( img, 36, 17, 10, 10 ),
    new Sprite( img, 51, 9, 8, 6 ),
    new Sprite( img, 60, 9, 6, 6 ),
    new Sprite( img, 46, 17, 5, 5 ),
    new Sprite( img, 52, 17, 5, 5 ),
    new Sprite( img, 58, 17, 5, 5 )
  ];

  buttton = new Sprite( img, 0, 17, 36, 10 );
    
}

var img = new Image();
img.onload = function(){ makeSprites( this ); };
img.src = "res/cats.png";
