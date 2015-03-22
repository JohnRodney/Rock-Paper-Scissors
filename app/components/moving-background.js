import Ember from 'ember';
import layout from '../templates/components/moving-background';
import rect from '../utils/canvas-rectangle.js';
export default Ember.Component.extend({
  layout: layout,
  tagName: 'canvas',
  classNames: ['moving-background'],
  width: 100,
  height: 100,
  attributeBindings: ['width', 'height'],
  interval: null,
  ctx: null,
  frame: 0,
  stopFrame: 0,
  mode: 1,
  rects: [],
  mode2Settings: null,
  init(){
    this._super();
    this.mode2Settings = {
      xOff: 0,
      yOff: 0,
      index: 0
    };
  },
  setRandomStop(){
    this.stopFrame = Math.floor(Math.random()*20)+3;
  },
  didInsertElement(){
    this.set('width', Ember.$('.play-area').width());
    this.set('height', Ember.$('.play-area').height());
    this.ctx = this.get('element').getContext('2d');
    this.setMode(2);
    var that = this;
    this.interval = setInterval(function(){
      that.drawScene();
    }, 100);
  },
  drawBackground(){
    var grd = this.ctx.createRadialGradient(this.width/2, this.height/2, this.width*0.2,
                                            this.width/2, this.height/2, this.width*0.6);
    grd.addColorStop(0, this.getRandomColor());
    grd.addColorStop(1, this.getRandomColor());
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.width, this.height);
  },
  setUpMode1(){
    this.rects = [];
    for(var x = 0; x < 1000; x++){
      this.rects[x] = new rect(0, 0, 0, 0, this.getRandomColor());
    }
  },
  setUpMode2(){
    var w = this.width/200;
    var h = this.height/200;
    this.rects = [];
    var index = 0;
    for(var x = 0; x < 100; x++){
      for(var y = 0; y < 100; y++){
        this.rects[index] = new rect(w, h, w*x, h*y, this.getRandomColor());
        this.rects[index].Accel(Math.floor(Math.random()*20)-10, Math.floor(Math.random()*10)-5);
        this.rects[index].setColor(this.getRandomColor());
        index++;
      }
    }
  },
  upDateMode2(){
    if(this.mode2Settings.index === 10){
      this.mode2Settings = {
        xOff: 0,
        yOff: 0,
        index: 0,
      };
      var index = 0;
      for(var x = 0; x < 100; x++){
        for(var y = 0; y < 100; y++){
          this.rects[index].Accel(Math.floor(Math.random()*50)-25, Math.floor(Math.random()*50)-25);
          index++;
        }
      }
    }
    this.mode2Settings.index++;
  },
  drawMode2(){
    this.upDateMode2();
    this.drawBackground();
    this.drawRects();
  },
  drawMode1(){
    if(this.frame === this.stopFrame){
      this.drawBackground();
      this.frame = 0;
      this.setRandomStop();
    }
    this.frame++;
    this.drawRects();
  },
  setMode(val){
    this.set('mode', val);
    switch(this.mode){
      case 1: this.setUpMode1(); break;
      case 2: this.setUpMode2(); break;
    }
  },
  drawScene(){
    switch(this.mode){
      case 1: this.drawMode1(); break;
      case 2: this.drawMode2(); break;
    }
  },
  drawRects(){
    for(var x = 0; x < this.rects.length; x++){
      if(this.mode === 1){
        this.rects[x].renderRandom(this.ctx);
      }
      else if(this.mode === 2){
        this.rects[x].render(this.ctx, x);
      }
    }
  },
  getRandomColor(){
    var r = Math.floor(Math.random()*10);
    var g = Math.floor(Math.random()*10);
    var b = Math.floor(Math.random()*10);
    return "#" + r + b + g;
  }
});
