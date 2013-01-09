var Question = function(game){
  this.game = game; 
  this.context = game.context;
  this.level = game.user.level;
	this.answer = 0;
	this.question = '';
	this.x = Helper.rand(1,500);
	this.y = -10;
	this.radius = Helper.rand(11,18);
	this.fill_color = 'red';
	this.line_width = 1;
	this.stroke_color = '#000';
  this.speed = Helper.rand(1,4);	
	this.generate();
  this.width = this.radius * 2;
	this.height = this.width;

}

Question.prototype.update = function(){
	this.y = this.y + this.speed;
//	this.context.fillText(this.question, this.x, this.y);
}

Question.prototype.draw = function(){
	this.context.font = '16px Arial';
  this.context.fillText(this.question, this.x, this.y);
  this.game.drawCircle(this.x, this.y, this.radius, this.fill_color, this.line_width, this.stroke_color);
}

Question.prototype.generate = function(){
      if(this.level === 1){
        var 
          base = this,
          num1 = Helper.rand(1,9),
          num2 = Helper.rand(1,9);

        this.answer = (num1 * num2);
        this.question = ' '+ num1 +' x '+ num2;
}

          

}         


