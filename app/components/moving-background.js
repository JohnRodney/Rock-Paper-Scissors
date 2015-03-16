import Ember from 'ember';
import layout from '../templates/components/moving-background';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'canvas',
  classNames: ['moving-background'],
  width: 100,
  height: 100,
  attributeBindings: ['width', 'height'],
  interval: null,
  ctx: null,
  rectangle: function(W, H, X, Y){
    var width = W;
    var height = H;
    var x = X;
    var y = Y;
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
    this.get = function(){
      return this;
    };
    this.setRandom = function(){
      x = Math.floor(Math.random()*2000)-100;
      y = Math.floor(Math.random()*1000)-100;
      width = Math.floor(Math.random()*2000);
      height = Math.floor(Math.random()*1000);
    };
  },
  rects: [],
  init(){
    this._super();
    for(var x = 0; x < 8; x++){
      this.rects[x] = new this.rectangle(0, 0, 0, 0);
    }
  },
  didInsertElement(){
    this.set('width', Ember.$('.play-area').width());
    this.set('height', Ember.$('.play-area').height());
    this.ctx = this.get('element').getContext('2d');
    var that = this;
    this.interval = setInterval(function(){
      that.drawScene();
    }, 100);
  },
  drawBackground(){
    this.ctx.fillStyle = "#353535";
    this.ctx.fillRect(0, 0, this.width, this.height);
  },
  drawScene(){
    this.drawBackground();
    this.drawRects();
  },
  drawRects(){
    for(var x = 0; x < this.rects.length; x++){
      this.ctx.fillStyle = this.getRandomColor();
      this.rects[x].setRandom();
      var r = this.rects[x];
      this.ctx.fillRect(r.getX(), r.getY(), r.getWidth(), r.getHeight());
    }
  },
  getRandomColor(){
    var r = Math.floor(Math.random()*10);
    var g = Math.floor(Math.random()*10);
    var b = Math.floor(Math.random()*10);
    return "#" + r + b + g;
  }
});
