var Player = function(game) {
  this.game = game;
	this.context = game.context;
  this.player_x = 230;
  this.player_y = 390;
	this.player_width=20;
	this.player_height = 40;
	this.sprite_x = 5;
	this.sprite_y = 79;
	this.sprite_width = 20;
	this.sprite_height = 34;
	//movement
	this.slow = 2;
	this.fast = 7;
	this.last_move = '';
	this.last_move_speed = '';
	this.image = new Image();
	this.image.src = 'images/sprite_sheet.png';
}

Player.prototype.update = function() {
  var hit = Helper.check_pixel_collision(this.context, this.player_x, this.player_y, this.player_width, this.player_height);
	if(hit === 'wall'){ this.backUp(); }

}

Player.prototype.draw = function() { 

	Helper.drawRectangle(this.context, '#fff', this.player_x, this.player_y, this.player_width, this.player_height);
  this.context.drawImage(this.image, this.sprite_x, this.sprite_y, this.sprite_width, this.sprite_height, this.player_x, this.player_y, this.player_width, this.player_height);
}
Player.prototype.backUp = function(){

	switch(this.last_move){
		case 'left':
			this.moveRight(this.last_move_speed);
			break;
		case 'right':
			this.moveLeft(this.last_move_speed);
			break;
		case 'up':
			this.moveDown(this.last_move_speed);
			break;
		case 'down':
			this.moveUp(this.last_move_speed);
			break;
	}
},
Player.prototype.moveLeft = function(speed){
	if(typeof speed === 'undefined'){ speed = 'slow' }

	var amount = (speed === 'slow') ? this.slow : this.fast;
	this.player_x -= amount;
	this.last_move = 'left';
	this.last_move_speed = speed;
}
Player.prototype.moveRight = function(speed){
	if(typeof speed === 'undefined'){ speed = 'slow' }

	var amount = (speed === 'slow') ? this.slow : this.fast;
	this.player_x += amount;
	this.last_move = 'right';
	this.last_move_speed = speed;
}
Player.prototype.moveUp = function(speed){
	if(typeof speed === 'undefined'){ speed = 'slow' }

	var amount = (speed === 'slow') ? this.slow : this.fast;
	this.player_y -= amount;
	this.last_move = 'up';
	this.last_move_speed = speed;
}
Player.prototype.moveDown = function(speed){
	if(typeof speed === 'undefined'){ speed = 'slow' }

	var amount = (speed === 'slow') ? this.slow : this.fast;
	this.player_y += amount;
	this.last_move = 'down';
	this.last_move_speed = speed;
}
Player.prototype.jump = function(){
	var 
		base = this,
		fps = this.game.fps,
		jump_length = 50,
		end_x = this.player_x + jump_length,
		jump_height = 30,
		top_y = this.player_y - jump_height,
		jump_time = 1000,
		interval;

console.log(top_y);
		interval = setInterval(function(){
			while(base.player_x < end_x){
				base.player_x += (jump_length / fps);

				if(base.player_y > top_y){ base.player_y -= (jump_height / (fps / 2)); }
				else{ base.player_y += (jump_height / (fps /2)); }
console.log(base.player_y)
			//clear interval when done
			}
		},  (1000/fps));

}
