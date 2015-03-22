export default function canvasRectangle(W, H, X, Y, C) {
  var width = W;
  var height = H;
  var x = X;
  var y = Y;
  var xAccel = 0;
  var yAccel = 0;
  var color = C;
  var maxSpeed = 20;
  this.getWidth = function(){
    return width;
  };
  this.getHeight = function(){
    return height;
  };
  this.getX = function(){
    return x;
  };
  this.getY = function(){
    return y;
  };
  this.setWidth = function(W){
    width = W;
  };
  this.setHeight = function(H){
    height = H;
  };
  this.setX = function(X){
    x = X;
  };
  this.setY = function(Y){
    y = Y;
  };
  this.set = function(W, H, X, Y){
    width = W;
    height = H;
    x = X;
    y = Y;
  };
  this.setColor = function(C){
    color = C;
  };
  this.get = function(){
    return this;
  };
  this.Accel = function(xa, ya){
    xAccel += xa;
    yAccel += ya;
  };
  this.applyAccel = function(){
    x += xAccel;
    y += yAccel;
    //x = Math.min(x, maxSpeed);
    //x = Math.max(x, -maxSpeed);
    if(xAccel > 0){
      xAccel--;
    }
    else if(xAccel < 0){
      xAccel++;
    }
    if(yAccel > 0){
      yAccel--;
    }
    else if(yAccel < 0){
      yAccel++;
    }
  }
  this.setRandom = function(){
    x = Math.floor(Math.random()*1900)-100;
    y = Math.floor(Math.random()*1000)-100;
    width = 1;
    height = 1;
  };
  this.renderRandom = function(ctx){
    this.setRandom();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };
  this.render = function(ctx){
    this.applyAccel();
    x = Math.max(0, x);
    x = Math.min(2000, x);
    y = Math.max(y, y);
    y = Math.min(1000, y);
    var grd = ctx.createRadialGradient(x+width/2, y+height/2, width/6,
                                       x+width/2, y+height/2, width/3);
    grd.addColorStop(0, color);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(x, y, width, height);
  };
}
