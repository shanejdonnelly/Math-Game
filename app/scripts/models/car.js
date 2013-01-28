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

	this.image = document.getElementById('vehicles_image');
//this.image.src = ABS_PATH + 'img/vehicles.png';
//	this.image.src = '../../images/vehicles.png';

	switch(this.road){
		case 'vert_left_south':
			this.x = 163;
			this.y = 0;
			this.sprite_x = 349;
			this.sprite_y = 144;
			this.width = 32;
			this.height = 68;
			break;
		case 'vert_left_north':
			this.x = 117;
			this.y = 600;
			this.sprite_x = 281;
			this.sprite_y = 217;
			this.width = 32;
			this.height = 69;
			break;
		case 'vert_right':
			this.x = 670;
			this.y = 0;
			this.sprite_x = 234;
			this.sprite_y = 143;
			this.width = 30;
			this.height = 48;
			break;
		case 'horz_slow':
			this.x = 0;
			this.y = 350;
			this.sprite_x = 495;
			this.sprite_y = 31;
			this.width = 50;
			this.height = 32;
			break;
		case 'horz_medium':
			this.x = 0;
			this.y = 273;
			this.sprite_x = 65;
			this.sprite_y = 72;
			this.width = 106;
			this.height = 53;
			break;
		case 'horz_fast':
			this.x = 0;
			this.y = 215;
			this.sprite_x = 104;
			this.sprite_y = 27;
			this.width = 63;
			this.height = 34;
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
			this.x = ((this.x - this.width) > (this.canvas_width * 3)) ? 0 : this.x + 10;

			break;
	}

}

Car.prototype.draw = function(){
	Helper.drawRectangle(this.context, 'red', this.x, this.y, this.width, this.height);
  this.context.drawImage(this.image, this.sprite_x, this.sprite_y, this.width, this.height, this.x, this.y, this.width, this.height);
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


