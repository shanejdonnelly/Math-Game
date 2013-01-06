var Game = function(canvas) {
  var base = this;
	this.fps = 30;
  this.context = canvas.getContext('2d');
  this.context_width = canvas.width;
  this.context_height = canvas.height;
  this.player = new Player(this);
  this.active_questions = [];
	this.awaiting_anwser = false;	
	this.current_question = 0;
  this.answered_questions = [];
	this.board = new Main_Controller(this, this.player);
	this.gameloop;
	this.questionloop;
  var game = this;
  this.playing = false;	
}

Game.prototype.play = function(){
	var game = this;
	this.playing = true;
  this.gameloop = setInterval(function() {
    game.updateAll();
    game.drawAll();
  }, 1000 / game.fps);

 this.questionloop = setInterval(function(){
  	var temp = new Question(game);
  	game.active_questions.push(temp);
	} , 2000);
 

}

Game.prototype.promptQuestion = function(question_num){
	this.pause();
	this.current_question = question_num;
	this.awaiting_answer = true;
	$('#container').trigger('question_prompted');
}

Game.prototype.checkAnswer = function(input_answer){
	var base = this;

	this.awaiting_answer = false;
	if(this.active_questions[this.current_question].answer === input_answer){
		this.active_questions.remove(this.current_question);
		$('#container').trigger('answer_correct');
	}
  else{ alert('damn'); }
	setTimeout(function(){ base.play();}, 200);
}

Game.prototype.pause = function(){
	this.playing = false;
	clearInterval(this.gameloop);
	clearInterval(this.questionloop);
}

Game.prototype.updateAll = function() {

  var player_collision;	
	this.player.update();
  
	for(var x=0; x < (this.active_questions.length - 1); x++){
    this.active_questions[x].update();  
		player_collision = Helper.check_collision(this.active_questions[x], this.player);
		if(player_collision){ this.promptQuestion(x); }
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
