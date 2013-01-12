var Game = function($container, canvas, user) {
  var base = this;
	this.user = user;
	this.fps = 30;
  this.context = canvas.getContext('2d');
  this.context_width = canvas.width;
  this.context_height = canvas.height;
  this.player = new Player(this);
  this.active_questions = [];
	this.awaiting_anwser = false;	
	this.current_question = 0;
  this.answered_questions = [];
	this.num_correct = 0;
	this.num_wrong = 0;
	this.board = new Main_Controller(this, this.player);
	this.gameloop;
	this.questionloop;
  var game = this;
  this.playing = false;	
	this.$el = $container;
	this.bg = new Image();
	this.bg.src = '../../images/maze.png';

}

Game.prototype.play = function(){
	var game = this;
	this.playing = true;
	this.$el.trigger('start_timer');
  this.gameloop = setInterval(function() {
    game.updateAll();
    game.drawAll();
  }, 1000 / game.fps);

 this.questionloop = setInterval(function(){
  	var temp = new Question(game);
  	game.active_questions.push(temp);
	} , 1500);
 

}

Game.prototype.pause = function(){
	this.playing = false;
	this.$el.trigger('stop_timer');
	clearInterval(this.gameloop);
	clearInterval(this.questionloop);
}

Game.prototype.updateAll = function() {
	if(this.q_correct === 10){ this.victory();  }
	if(this.q_wrong === 10){ this.defeat();  }
	
	this.player.update(); 

	for(var x=0; x < (this.active_questions.length - 1); x++){
    this.active_questions[x].update();  

	  var hit_question = Helper.check_collision( this.active_questions[x], this.player);
		if(hit_question){ this.promptQuestion(x); }
  }

}

Game.prototype.drawAll = function() {
//  this.context.clearRect( 0, 0, this.context_width, this.context_height);
this.context.drawImage(this.bg,0,0,this.context_width, this.context_height);
//this.drawRectangle('#000', 0,0,450, 400);
//this.drawRectangle('#fff', 100,100, 500, 500);
  this.player.draw();
  for(var x=0; x < (this.active_questions.length - 1); x++){
    this.active_questions[x].draw();  
  }
}

Game.prototype.drawRectangle = function(color, x, y, width, height) {
  this.context.fillStyle = color;
  this.context.fillRect(x, y, width, height);
}

Game.prototype.drawCircle = function(center_x, center_y, radius, fill_color, line_width, stroke_color ){
  this.context.beginPath();
  this.context.arc(center_x, center_y, radius, 0, 2 * Math.PI);
  this.context.fillStyle = fill_color;
  this.context.fill();
  this.context.lineWidth = line_width;
  this.context.strokeStyle = stroke_color;
  this.context.stroke();
}

Game.prototype.promptQuestion = function(question_num){
	this.pause();
	this.current_question = question_num;
	this.awaiting_answer = true;
	this.$el.trigger('question_prompted', this.active_questions[this.current_question].question);
}

Game.prototype.checkAnswer = function(input_answer){
	var base = this;

	this.awaiting_answer = false;
	if(this.active_questions[this.current_question].answer === input_answer){
		this.active_questions.remove(this.current_question);
		this.num_correct++; 
		this.$el.trigger('answer_correct');
	}
  else{ alert('damn'); }
	setTimeout(function(){ base.play();}, 200);
}


Game.prototype.addQuestion = function(){
  var temp = new Question(this);
  this.active_questions.push(temp);
}

Game.prototype.victory = function(){
	this.pause();
	this.$el.trigger('victory');
}

Game.prototype.defeat = function(){
	this.pause();
	this.$el.trigger('defeat');
}

