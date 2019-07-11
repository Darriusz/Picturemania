var canvas = document.getElementById("can");
var image = null;
var ctx = canvas.getContext("2d");

function upload(){
  var file = document.getElementById("fileName");
  image = new SimpleImage(file);
  image.drawTo(canvas);  
}

function check(){
  if (image==null || !image.complete()) {
    alert(`Please, upload an image.`);
    return;
  }
}

function makeGrey(){
  check();
  var output = new SimpleImage(image.width,image.height);
  for (var px of image.values()){
    var avg = (px.getRed()+px.getGreen()+px.getBlue())/3;
    var x = px.getX();
    var y = px.getY();
    output.getPixel(x,y).setRed(avg);
    output.getPixel(x,y).setGreen(avg);
    output.getPixel(x,y).setBlue(avg);
  }
  output.drawTo(canvas);  
}

function cropP(){
  check();
  var output = new SimpleImage(image.width/1.2,image.height/1.2);
  for (var px of output.values()){
    var x = px.getX();
    var y = px.getY();
    px.setRed(image.getPixel(x,y).getRed());
    px.setGreen(image.getPixel(x,y).getGreen());
    px.setBlue(image.getPixel(x,y).getBlue());
  }
  output.drawTo(canvas);  
}

function makeStripes(){
  check();
  var output = new SimpleImage(image.width,image.height);
  for (var px of image.values()){
    var x = px.getX();
    var y = px.getY();
    output.setPixel(x,y,px);
    if (x<image.width/4){
      output.getPixel(x,y).setRed(255);
      output.getPixel(x,y).setGreen(205);}
    else {
      if (x<2*image.width/3)
        output.getPixel(x,y).setGreen(200);
      else
        output.getPixel(x,y).setBlue(255);
    }
  }
  var output1 = new SimpleImage(image.width,image.height);
  for (var px of output.values()){
    var x = px.getX();
    var y = px.getY();
    output1.setPixel(x,y,px);
  }
//  var h = Math.round(image.height/2);
 // for (var x=0;x<image.width/3;x++){
 //   var pixel = output.getPixel((image.width/3+x),h);
//    output1.setPixel(x,h,pixel);
//  }
// for (var x>=image.width/3;x<image.width;x++){
//    var pixel = output.getPixel((x-image.width/3),h);
 //   output1.setPixel(x,h,pixel);
//  }
  output1.drawTo(canvas);
 // output.drawTo(canvas);
}

function makeRedFilter() {
  check();
  var output = new SimpleImage(image.width,image.height);
  for (var px of image.values()){
    var x = px.getX();
    var y = px.getY();
    var r = px.getRed();   
    var g = px.getGreen();   
    var b = px.getBlue();   
    if ((r+g+b)/3<128){
      output.getPixel(x,y).setRed(2*(r+g+b)/3);
    }
    else{
    output.getPixel(x,y).setRed(255);
    output.getPixel(x,y).setGreen(2*(r+g+b)/3-255);
    output.getPixel(x,y).setBlue(2*(r+g+b)/3-255);
    }  
  }
  output.drawTo(canvas); 
}


function makePsy() {
  check();
  var output = new SimpleImage(image.width,image.height);
  for (var px of image.values()){
    var x = px.getX();
    var y = px.getY();
    output.getPixel(x,y).setRed(image.getPixel(x,y).getBlue());
   output.getPixel(x,y).setGreen(image.getPixel(x,y).getRed());
   output.getPixel(x,y).setBlue(image.getPixel(x,y).getGreen());
  }
  output.drawTo(canvas); 
}

function makeNeg() {
  check();
  var output = new SimpleImage(image.width,image.height);
  for (var px of image.values()){
    var x = px.getX();
    var y = px.getY();
    output.getPixel(x,y).setRed(255-image.getPixel(x,y).getRed());
   output.getPixel(x,y).setGreen(255-image.getPixel(x,y).getGreen());
  output.getPixel(x,y).setBlue(255-image.getPixel(x,y).getBlue());
  }
  output.drawTo(canvas); 
}

function blurIm(){
  check();
  var output=new SimpleImage(image.width,image.height);
  var dist=3;
  var inp = document.getElementById("param");
  var input = inp.value;

  if (input>0 && input<11){
       dist = Math.round(input);
  }
  else {
       dist = 5;
       alert(`You have not entered a valid parameter. Running for parameter 3.`);
  }
       
  for (var px of image.values()){
    var x = px.getX();
    var y = px.getY();
    if (Math.random()>0.5)
      output.setPixel(x,y,px);
    else {
      if (Math.random()>0.5) {
        var x1 = x + Math.round(Math.random()*2+dist);
        var y1 = y + Math.round(Math.random()*2+dist);
  //      if (x1<0)
    //       x1 += (10+dist);
        if (x1>=image.width)
          x1 -=(2+dist);
  //      if (y1<0)
  //        y1 +=(10+dist);
        if (y1>=image.height)
          y1 -=(2+dist);
        output.setPixel(x,y,image.getPixel(x1,y1));
      }
      else {
        var x1 = x - Math.round(Math.random()*2+dist);
        var y1 = y - Math.round(Math.random()*2+dist);
        if (x1<0)
           x1 += (2+dist);
//        if (x1>=image.width)
  //        x1 -=(10+dist);
        if (y1<0)
          y1 +=(2+dist);
  //      if (y1>=image.height)
    //      y1 -=(10+dist);
        output.setPixel(x,y,image.getPixel(x1,y1));
      }
    }  
  }
  output.drawTo(canvas);
}

function makeSur() {
  check();
  var output = new SimpleImage(image.width,image.height);
  for (var px of image.values()){
    var x = px.getX();
    var y = px.getY();
    output.getPixel(x,y).setRed(150);
   output.getPixel(x,y).setGreen(255-image.getPixel(x,y).getBlue());
  output.getPixel(x,y).setBlue(255-image.getPixel(x,y).getRed());
  }
  output.drawTo(canvas);   
}

function original(){
  check();
  image.drawTo(canvas);
}

function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  image=null;
}