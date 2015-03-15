import Ember from 'ember';
import layout from '../templates/components/rps-board';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['rps-board'],
  boardData: [],
  score: 0,
  tempScore: 0,
  init(){
    this._super();
    this.generateBoard();
  },
  generateBoard(){
    var tempArray = [];
    for(var x = 0; x < 8; x++){
      tempArray[x] = [];
      for(var y = 0; y < 8; y++){
        tempArray[x][y] = {
          value: Math.floor(Math.random()*3),
          row: x+1,
          col: y+1,
          highlight: false,
          dontSet: false
        };
      }
    }
    this.set('boardData', tempArray);
  },
  canBeat(valA, valB){
    return ((valB+1 === valA) || (valA === 0 && valB === 2));
  },
  applyHighlight(obj){
    var didHighlight = false;
    var keys = [];
    keys[0] = {rowSet: obj.row-2, colSet: obj.col-1, row: obj.row-1, col: obj.col};
    keys[1] = {rowSet: obj.row, colSet: obj.col-1, row: obj.row+1, col: obj.col};
    keys[2] = {rowSet: obj.row-1, colSet: obj.col-2, row: obj.row, col: obj.col-1};
    keys[3] = {rowSet: obj.row-1, colSet: obj.col, row: obj.row, col: obj.col+1};
    var tempArray = [];
    for(var x = 0; x < 8; x++){
      tempArray[x] = [];
      for(var y = 0; y < 8; y++){
        var didSet = false;
        for(var i = 0; i < keys.length; i++){
          if(x === keys[i].rowSet && y === keys[i].colSet &&
             this.canBeat(this.boardData[obj.row-1][obj.col-1].value,
                          this.boardData[keys[i].row-1][keys[i].col-1].value) &&
                          !this.boardData[x][y].dontSet){
              tempArray[keys[i].rowSet][keys[i].colSet] = {
              highlight: true,
              col: keys[i].col,
              row: keys[i].row,
              value: this.boardData[keys[i].rowSet][keys[i].colSet].value,
              dontSet: true
            };
            this.tempScore += 1;
            keys[i].didHighlight = true;
            didSet = true;
            didHighlight = true;
          }
        }
        if(!didSet){
          tempArray[x][y] = this.boardData[x][y];
        }
      }
    }
    this.set('boardData', tempArray);
    if(didHighlight){
      for(var key = 0; key < keys.length; key++){
        if(keys[key].didHighlight){
          this.applyHighlight({row: keys[key].row, col: keys[key].col});
        }
      }
    }
  },
  clearHighLights(){
    var tempArray = [];
    for(var x = 0; x < 8; x++){
      tempArray[x] = [];
      for(var y = 0; y < 8; y++){
        if(this.boardData[x][y].highlight){
          tempArray[x][y] = {
            highlight: false,
            col: x+1,
            row: y+1,
            value: -1,
            dontSet: false
          };
        }
        else{
          tempArray[x][y] = this.boardData[x][y];
        }
      }
    }
    this.set('boardData', tempArray);
  },
  actions: {
    highlightAdjacent(obj){
      this.beginPropertyChanges();
      this.applyHighlight(obj);
      this.endPropertyChanges();
      this.set('score', this.tempScore*1000 + this.score);
      this.tempScore = 0;
      this.animateHighlight();
    }
  },
  animateHighlight(){
    var that = this;
    setTimeout(function(){
      Ember.$('.highlight').removeClass('highlight scissors paper rock');
      setTimeout(function(){
        that.dropDown();
      }, 500);
    }, 500);
  },
  dropDown(){
    this.beginPropertyChanges();
    this.clearHighLights();
    var tempArray = [];
    var markedCols = [];
    var markedIndex = 0;
    for(var x = 0; x < 8; x++){
      tempArray[x] = [];
      for(var y = 0; y < 8; y++){
        tempArray[x][y] = {};
        if(this.boardData[x][y].value === -1){
          if(markedCols.indexOf(y) === -1){
            markedCols[markedIndex] = y;
            markedIndex++;
          }
        }
      }
    }
    for(var c = 0; c < markedIndex; c++){
      var colArray = [];
      for(var row = 7; row >= 0; row--){
        if(this.boardData[row][markedCols[c]].value !== -1){
          colArray[colArray.length] = this.boardData[row][markedCols[c]].value;
        }
      }
      for(var r = colArray.length; r < 8; r++){
        colArray[colArray.length] = Math.floor(Math.random()*3);
      }
      for(var rr = 0; rr < 8; rr++){
        tempArray[rr][markedCols[c]] = {
          value: colArray[7-rr],
          col: markedCols[c]+1,
          row: rr+1,
          highlight: false,
          dontSet: false
        };
      }
    }
    for(var xx = 0; xx < 8; xx++){
      for(var yy = 0; yy < 8; yy++){
        if(typeof(tempArray[xx][yy].value) === 'undefined'){
          tempArray[xx][yy] = this.boardData[xx][yy];
        }
      }
    }
    this.set('boardData', tempArray);
    this.endPropertyChanges();
  }
});
