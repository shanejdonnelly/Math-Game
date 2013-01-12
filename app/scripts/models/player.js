var Player = function(game) {
  this.game = game;
	this.context = game.context;
  this.player_x = 200;
  this.player_y = 335;
	this.player_width=20;
	this.player_height = 40;
	this.sprite_x = 5;
	this.sprite_y = 79;
	this.sprite_width = 20;
	this.sprite_height = 40;
	this.last_move = '';
this.image = new Image();
this.image.src = 'images/sprite_sheet.png';
}

Player.prototype.update = function() {
  var hit_wall = Helper.check_pixel_collision(this.context, this.player_x, this.player_y, this.player_width, this.player_height);
	if(hit_wall){ this.backUp(); }
}

Player.prototype.draw = function() { 

	this.game.drawRectangle('#fff', this.player_x, this.player_y, this.player_width, this.player_height);
  this.context.drawImage(this.image, this.sprite_x, this.sprite_y, this.sprite_width, this.sprite_height, this.player_x, this.player_y, this.player_width, this.player_height);
}
Player.prototype.backUp = function(){
	switch(this.last_move){
		case 'left':
			this.moveRight();
			break;
		case 'right':
			this.moveLeft();
			break;
		case 'up':
			this.moveDown();
			break;
		case 'down':
			this.moveUp();
			break;
	}
},
Player.prototype.moveLeft = function(){
	this.player_x -= 5;
	this.last_move = 'left';
}
Player.prototype.moveRight = function(){
	this.player_x += 5;
	this.last_move = 'right';
}
Player.prototype.moveUp = function(){
	this.player_y -= 5;
	this.last_move = 'up';
}
Player.prototype.moveDown = function(){
	this.player_y += 5;
	this.last_move = 'down';
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
