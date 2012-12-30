var Game = function() {
  this.fps = 60;
  var canvas = document.getElementById('world');
  this.context = canvas.getContext('2d');
  this.context_width = canvas.width;
  this.context_height = canvas.height;
  this.player = new Player(this);
  this.active_questions = [];
  this.answered_questions = [];

  var game = this;
  var gameloop = setInterval(function() {
    game.updateAll();
    game.drawAll();
  }, 1000 / this.fps);

  var questionloop = setInterval(function(){
    game.addQuestion();
  }, 3000);

}

Game.prototype.updateAll = function() {
  this.player.update();
  for(var x=0; x < --this.active_questions.length; x++){
    active_questions[x].update();  
  }
}

Game.prototype.drawAll = function() {
  this.drawRectangle('#fff', 0, 0, this.context_width, this.context_height);
  this.player.draw();
  for(var x=0; x < --this.active_questions.length; x++){
    active_questions[x].draw();  
  }
}

Game.prototype.drawRectangle = function(color, x, y, width, height) {
  this.context.fillStyle = color;
  this.context.fillRect(x, y, width, height);
}

Game.prototype.addQuestion = function(){
  var temp = new Question(this);
  this.active_questions.push(temp);
}
