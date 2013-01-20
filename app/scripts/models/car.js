var Car = function(game, road){
  this.game = game; 
	this.road = road;
  this.context = game.context;
	this.canvas_width = game.context_width;
	this.canvas_height = game.context_height;
  this.level = game.user.level;
	this.x = 0;
	this.y = 0;
  this.width = 65;
	this.height = 35;
	this.vin = Helper.rand(1,1000000000000);

	switch(this.road){
		case 'vert_left_south':
			this.x = 163;
			this.y = 0;
			this.width = 35;
			this.height = 65;
			break;
		case 'vert_left_north':
			this.x = 117;
			this.y = 600;
			this.width = 35;
			this.height = 65;
			break;
		case 'vert_right':
			this.x = 670;
			this.y = 0;
			this.width = 35;
			this.height = 65;
			break;
		case 'horz_slow':
			this.x = 0;
			this.y = 350;
			break;
		case 'horz_medium':
			this.x = 0;
			this.y = 278;
			break;
		case 'horz_fast':
			this.x = 0;
			this.y = 215;
			break;
	}
}

Car.prototype.update = function(){
	switch(this.road){
		case 'vert_left_south':
			
			this.y = ((this.y - this.height) > this.canvas_height) ? 0 : this.y + 4;
			break;
		case 'vert_left_north':
			this.y = ((this.y + this.height) < 0) ? this.canvas_height : this.y - 4;
			break;
		case 'vert_right':
			this.y = ((this.y - this.height) > (this.canvas_height * 1.2)) ? 0 : this.y + 4;
			break;
		case 'horz_slow':
			this.x = ((this.x - this.width) > this.canvas_width) ? 0 : this.x + 2;

			break;
		case 'horz_medium':
			this.x = ((this.x - this.width) > this.canvas_width) ? 0 : this.x + 4;

			break;
		case 'horz_fast':
			this.x = ((this.x - this.width) > (this.canvas_width * 3)) ? 0 : this.x + 15;

			break;
	}

}

Car.prototype.draw = function(){
	Helper.drawRectangle(this.context, 'red', this.x, this.y, this.width, this.height);
}         

//after the player has been hit by a car
//we need to move it ahead of the player 
//or a loop of hits will occur
Car.prototype.moveAhead = function(){
	switch(this.road){
		case 'vert_left_south':
			this.y = this.y + this.height * 2;
			break;
		case 'vert_left_north':
			this.y = this.y - this.height * 2;
			break;
		case 'vert_right':	
			this.y = this.y + this.height * 2;
			break;
		case 'horz_slow':
			this.x = this.x + this.width * 2;
			break;
		case 'horz_medium':
			this.x = this.x + this.width * 2;
			break;
		case 'horz_fast':
			this.x = this.x + this.width * 2;
			break;
	}

}


