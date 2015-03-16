import Ember from 'ember';
import layout from '../templates/components/music-player';

export default Ember.Component.extend({
  layout: layout,
  playList: [],
  interval: null,
  playListIndex: 0,
  started: false,
  init(){
    this._super();
    this.playList[0] = new Audio('assets/music/we-know.mp3');
    this.playList[1] = new Audio('assets/music/like-a-zombie.mp3');
    this.playList[2] = new Audio('assets/music/somber-sumbrero.mp3');
    this.playList[3] = new Audio('assets/music/the-feels.mp3');
    this.playList[4] = new Audio('assets/music/alittlechang.mp3');
    this.playListIndex = Math.floor(Math.random()*this.playList.length);
  },
  didInsertElement(){
    var that = this;
    this.Interval = setInterval(
      function(){
        that.handleMusic();
      },
      2000
    );
  },
  handleMusic(){
    if(!this.started){
      this.playList[this.playListIndex].play();
      this.started = true;
    }
    else{
      if(this.hasEnded()){
        this.playListIndex++;
        if(this.playListIndex === this.playList.length){
          this.resetAllTracks();
          this.playListIndex = 0;
        }
        this.playList[this.playListIndex].play();
      }
    }
  },
  hasEnded(){
    if(this.playList[this.playListIndex].ended){
      return true;
    }
    return false;
  },
  resetAllTracks(){
    for(var x = 0; x < this.playList.length; x++){
      this.playList[x].currentTime = 0;
    }
  }
});
