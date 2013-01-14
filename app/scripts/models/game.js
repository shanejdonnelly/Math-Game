var Game = function($container, canvas, user) {
  var base = this;
	this.user = user;
	this.fps = 30;
  this.context = canvas.getContext('2d');
  this.context_width = canvas.width;
  this.context_height = canvas.height;
  this.player = new Player(this);
  this.active_cars = [];
	this.awaiting_anwser = false;	
	this.current_question;
	this.hit_car;
	this.collision = false;
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
	this.bg.src = '../../images/town.png';

}

Game.prototype.play = function(){
	var game = this;
	this.playing = true;
	this.collision = false;
	this.$el.trigger('start_timer');
  this.gameloop = setInterval(function() {
    game.updateAll();
    game.drawAll();
  }, 1000 / game.fps);

 this.vert_left_north_carloop = setInterval(function(){
  	var temp = new Car(game, 'vert_left_north');
  	game.active_cars.push(temp);
	} , 3500);
 	this.vert_left_south_carloop = setInterval(function(){
  	var temp = new Car(game, 'vert_left_south');
  	game.active_cars.push(temp);
	} ,3500);
	this.vert_right_carloop = setInterval(function(){
  	var temp = new Car(game, 'vert_right');
  	game.active_cars.push(temp);
	} ,3500);
	this.horz_slow_carloop = setInterval(function(){
  	var temp = new Car(game, 'horz_slow');
  	game.active_cars.push(temp);
	} , 6500);
	this.horz_medium_carloop = setInterval(function(){
  	var temp = new Car(game, 'horz_medium');
  	game.active_cars.push(temp);
	} , 3500);
	this.horz_fast_carloop = setInterval(function(){
  	var temp = new Car(game, 'horz_fast');
  	game.active_cars.push(temp);
	} , 6500);
 

}

Game.prototype.pause = function(){
	//clear player move - if arrow key has been pressed
	clearInterval(this.gameloop);
	clearInterval(this.vert_left_north_carloop);
	clearInterval(this.vert_left_south_carloop);
	clearInterval(this.vert_right_carloop);
	clearInterval(this.horz_slow_carloop);
	clearInterval(this.horz_medium_carloop);
	clearInterval(this.horz_fast_carloop);
	this.playing = false;
	this.$el.trigger('stop_timer');
}

Game.prototype.updateAll = function() {
	if(this.q_correct === 10){ this.victory();  }
	if(this.q_wrong === 10){ this.defeat();  }
	
	this.player.update(); 

	for(var x=0; x < (this.active_cars.length - 1); x++){
    this.active_cars[x].update();  

	  var bang = Helper.check_collision( this.active_cars[x], this.player);
		if(bang && this.collision === false){ this.pause(); this.collision = true; this.hit_car = x; this.promptQuestion(); }
  }

}

Game.prototype.drawAll = function() {
//  this.context.clearRect( 0, 0, this.context_width, this.context_height);
this.context.drawImage(this.bg,0,0,this.context_width, this.context_height);
//this.drawRectangle('#000', 0,0,450, 400);
//this.drawRectangle('#fff', 100,100, 500, 500);
  this.player.draw();
  for(var x=0; x < (this.active_cars.length - 1); x++){
    this.active_cars[x].draw();  
  }
}

Game.prototype.promptQuestion = function(){	
//	this.pause();
	this.current_question = new Question(this, this.user.level);
	console.log(this.current_question);	
this.awaiting_answer = true;
	this.$el.trigger('question_prompted', this.current_question.question_string);
}

Game.prototype.checkAnswer = function(input_answer){
	var base = this;

	this.awaiting_answer = false;
	if(this.current_question.answer === input_answer){
		this.active_cars.remove(this.hit_car);
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

