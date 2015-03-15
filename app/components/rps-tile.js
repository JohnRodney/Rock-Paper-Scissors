import Ember from 'ember';
import layout from '../templates/components/rps-tile';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['tile'],
  classNameBindings: ['scissors', 'rock', 'paper', 'highlight'],
  init(){
    this._super();
    this.findClass();
  },
  findClass(){
    switch(this.value){
      case 0: this.set('scissors', true); break;
      case 1: this.set('rock', true); break;
      case 2: this.set('paper', true); break;
    }
  },
  click(){
    this.send('checkAdjacent');
  },
  actions: {
    checkAdjacent(){
      this.sendAction('action', {row: this.row, col: this.col, value: this.value});
    }
  }
});
