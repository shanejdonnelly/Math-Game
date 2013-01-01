var Game = function(canvas) {
  var base = this;
	this.fps = 30;
  this.context = canvas.getContext('2d');
  this.context_width = canvas.width;
  this.context_height = canvas.height;
  this.player = new Player(this);
  this.active_questions = [];
  this.answered_questions = [];
	this.ui = new Controller(this, this.player);
	this.gameloop;
	this.questionloop;
  var game = this;
}

Game.prototype.play = function(){
	var game = this;

  this.gameloop = setInterval(function() {
    game.updateAll();
    game.drawAll();
  }, 1000 / game.fps);

 this.questionloop = setInterval(function(){
  	var temp = new Question(game);
  	game.active_questions.push(temp);
	} , 2000);
 

}

Game.prototype.pause = function(){
	clearInterval(this.gameloop);
	clearInterval(this.questionloop);
}

Game.prototype.updateAll = function() {

  var collision;	
	this.player.update();
  
	for(var x=0; x < (this.active_questions.length - 1); x++){
    this.active_questions[x].update();  
		collision = Helper.check_collision(this.active_questions[x], this.player);
		if(collision){ this.pause(); alert('answer question');this.active_questions.remove(x); this.play(); }
  }

}

Game.prototype.drawAll = function() {
  this.drawRectangle('#fff', 0, 0, this.context_width, this.context_height);
  this.player.draw();
  for(var x=0; x < (this.active_questions.length - 1); x++){
    this.active_questions[x].draw();  
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
