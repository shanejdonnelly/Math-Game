var Car = function(game, road){
  this.game = game; 
	this.road = road;
  this.context = game.context;
  this.level = game.user.level;
	this.x = 0;
	this.y = 0;
	this.direction = '';
	this.fill_color = 'red';
  this.speed = 0;	
	//this.generate();
  this.width = 65;
	this.height = 35;

	switch(this.road){
		case 'vert_left_south':
			this.x = 163;
			this.y = -10;
			this.width = 35;
			this.height = 65;
			break;
		case 'vert_left_north':
			this.x = 117;
			this.y = 610;
			this.width = 35;
			this.height = 65;
			break;
		case 'vert_right':
			this.x = 670;
			this.y = -10;
			this.width = 35;
			this.height = 65;
			break;
		case 'horz_slow':
			this.x = -10;
			this.y = 350;
			break;
		case 'horz_medium':
			this.x = -10;
			this.y = 278;
			break;
		case 'horz_fast':
			this.x = -10;
			this.y = 215;
			break;
	}
}

Car.prototype.update = function(){
//	this.y = this.y + this.speed;
//	this.context.fillText(this.question, this.x, this.y);
	switch(this.road){
		case 'vert_left_south':

			this.y = this.y + 4;
			break;
		case 'vert_left_north':

			this.y = this.y - 5;
			break;
		case 'vert_right':

			this.y = this.y + 3;
			break;
		case 'horz_slow':
			this.x = this.x + 2;

			break;
		case 'horz_medium':
			this.x = this.x + 5;

			break;
		case 'horz_fast':
			this.x = this.x + 15;

			break;
	}
}

Car.prototype.draw = function(){
	//this.context.font = '16px Arial';
  //this.context.fillText(this.question, this.x, this.y);
//  this.game.drawCircle(this.x, this.y, this.radius, this.fill_color, this.line_width, this.stroke_color);
	Helper.drawRectangle(this.context, 'red', this.x, this.y, this.width, this.height);
}

Car.prototype.generate = function(){
      if(this.level === 1){
        var 
          base = this,
          num1 = Helper.rand(1,9),
          num2 = Helper.rand(1,9);

        this.answer = (num1 * num2);
        this.question = ' '+ num1 +' x '+ num2;
}

          

}         


