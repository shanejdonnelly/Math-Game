var Question = function(game){
  this.game = game; 
  this.context = game.context;
  this.level = 1;
	this.answer = 0;
	this.question = '';
	this.x = Helper.rand(1,200);
	this.y = -10;
  this.speed = Helper.rand(1,4);	
	this.generate();
  this.width = 50;
	this.height = 15;

}

Question.prototype.update = function(){
	this.y = this.y + this.speed;
//	this.context.fillText(this.question, this.x, this.y);
}

Question.prototype.draw = function(){

  this.context.fillText(this.question, this.x, this.y);
 
}

Question.prototype.generate = function(){
      if(this.level === 1){
        var 
          base = this,
          num1 = Helper.rand(1,5),
          num2 = Helper.rand(1,5);

        this.answer = (num1 * num2);
        this.question = ' '+ num1 +' x '+ num2 +'  =';
}

          

}         


