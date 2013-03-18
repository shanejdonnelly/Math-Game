var Game = function($container, user, mode) {
  var base = this;
  this.user = user;
  this.mode = mode;
  this.fps = 30;
  this.context = CTX;
  this.context_width = CANVAS.width;
  this.context_height = CANVAS.height;
  this.player = new Player(this);
  this.awaiting_anwser = false;	
  this.current_question;
  this.hit_car = 0;
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
  this.bg = document.getElementById('town_image');
  //	this.bg.src = ABS_PATH + 'img/town.png';
//  this.bg.src = '../../images/town.png';
  this.houses_visited = [];
  this.cars = this.buildCars(6);
  this.num_houses = 5;
  this.in_house = false;
  this.car_accident = false;
  this.current_house = 99;
  //trolls
    this.trolls_fought = [];
      this.num_trolls = 2;
        this.fighting_troll = false;
          this.current_troll = 99;
}

Game.prototype.buildCars = function(num){
  var 
    roads = ['vert_left_north', 'vert_left_south', 'vert_right', 'horz_slow', 'horz_medium', 'horz_fast'],
          cars = [];

  for(var i = 0; i < num; i++){
    cars[i] = new Car(this, roads[i]);
  } 	
  return cars;
}

Game.prototype.play = function(){
  var game = this;
  this.playing = true;
  this.collision = false;
  this.$el.trigger('play');

  this.gameloop = setInterval(function() {
      game.updateAll();
      game.drawAll();
      }, 1000 / game.fps);
}

Game.prototype.pause = function(){
  //TODO clear player move - if arrow key has been pressed
  clearInterval(this.gameloop);
  this.playing = false;
  this.$el.trigger('pause');
}

Game.prototype.updateAll = function() {
  if(this.num_correct === 10){ this.victory();  }
  if(this.num_wrong === 10){ this.defeat();  }

  //update trolls and check for battles
  this.player.update(); 
  for(var key1=0; key1 < this.num_trolls; key1++){
    var at_troll = Helper.check_collision(trolls[key1], this.player);
    if(at_troll && (this.fighting_troll === false) && (Helper.notIn( this.trolls_fought, key1  ))){ 
      this.pause(); 
      this.trolls_fought.push(key1);
      this.fighting_troll = true; 
      this.current_troll = key1; 
      this.fightTroll(); 
    }
  }
  //update houses and check for visits
  for(var key=0; key < this.num_houses; key++){
    var at_house = Helper.check_collision(houses[key], this.player);
    if(at_house && (this.in_house === false) && (Helper.notIn( this.houses_visited, key  ))){ 
      this.pause(); 
      this.houses_visited.push(key);
      this.in_house = true; 
      this.current_house = key; 
      this.visitingHouse(); 
    }
    //else if(Helper.isIn(this.houses_visited, key)){ this.pause(); this.$el.trigger('house_visited', key);  }
  }
  //update cars and look for collisions
  for(var x=0; x < (this.cars.length); x++){
    this.cars[x].update();  
    var bang = Helper.check_collision( this.cars[x], this.player);
    if(bang && this.collision === false){ this.pause(); this.hitCar(x); }
  }
}

Game.prototype.drawAll = function() {
  this.context.drawImage(this.bg,0,0,this.context_width, this.context_height);
  this.player.draw();
  for(var x=0; x < (this.cars.length); x++){
    this.cars[x].draw();  
  }
}

Game.prototype.fightTroll = function(){ 
  var
  base = this, 
  key = this.current_troll,
  qc = trolls[key].questions_correct; 

  if(qc === 0){ 
    this.$el.trigger('fight_troll', trolls[key]);
  }
  if(qc < 5){
    this.current_question = new Question(this, this.user.level);
    this.promptQuestion();
  } 
  else{
    this.fighting_troll = false;
    this.awaiting_answer = false;
    this.$el.trigger('leave_troll', trolls[key]); 
    setTimeout(function(){ base.play();}, 200);
  }
}

Game.prototype.visitingHouse = function(){	
  var
  base = this, 
  key = this.current_house,
  qc = houses[key].questions_correct;	

  if(qc === 0){	
    this.$el.trigger('visit_house', houses[key]);
  }
  if(qc < 3){
    this.current_question = new Question(this, this.user.level, houses[key].number);
    this.promptQuestion();
  }	
  else{
    this.in_house = false;
    this.awaiting_answer = false;
    this.$el.trigger('leave_house', houses[key]);	
    setTimeout(function(){ base.play();}, 200);
  }
}

Game.prototype.hitCar = function(key){	
  this.collision = true;
  this.hit_car = key;
  this.current_question = new Question(this, this.user.level);
  this.promptQuestion();
}

Game.prototype.promptQuestion = function(){
  this.awaiting_answer = true;
  this.$el.trigger('question_prompted', this.current_question.question_string);
}


Game.prototype.checkAnswer = function(input_answer){
  var base = this;
  if(this.current_question.answer === input_answer){  
    this.$el.trigger('answer_correct');
    if(this.collision){ 
      this.cars[this.hit_car].moveAhead();  
      this.awaiting_answer = false; 
      this.collision = false; 
      setTimeout(function(){ base.play();}, 200);
    }
    else if(this.in_house){ 
      this.num_correct++;
      houses[this.current_house].questions_correct++;
      setTimeout(function(){base.visitingHouse();}, 500);
      this.awaiting_answer = false;
    }
    else if (this.fighting_troll){
      trolls[this.current_troll].questions_correct++;
      setTimeout(function(){base.fightTroll();}, 500);
      this.awaiting_answer = false;
    }
  }
  else{ 
    alert('nope - try again'); 
    this.$el.trigger('question_prompted', this.current_question.question_string);
  }

}


Game.prototype.victory = function(){
  this.pause();
  this.$el.trigger('victory');
  alert('You win! Nice work!');
}

Game.prototype.defeat = function(){
  this.pause();
  this.$el.trigger('defeat');
}

