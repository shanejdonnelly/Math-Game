var Player = function(game) {
  this.game = game;
	this.context = game.context;
  this.player_x = 200;
  this.player_y = 400;
	this.player_width=20;
	this.player_height = 40;
	this.sprite_x = 5;
	this.sprite_y = 79;
	this.sprite_width = 20;
	this.sprite_height = 40;
this.image = new Image();
this.image.src = 'images/sprite_sheet.png';
}

Player.prototype.update = function() {

  //this.game.drawRectangle('#f00', this.x, this.y, 10, 10);

}

Player.prototype.draw = function() { 

	this.game.drawRectangle('#f00', this.player_x, this.player_y, this.player_width, this.player_height);
  this.context.drawImage(this.image, this.sprite_x, this.sprite_y, this.sprite_width, this.sprite_height, this.player_x, this.player_y, this.player_width, this.player_height);
}

Player.prototype.moveLeft = function(){

	this.player_x -= 5;
}
Player.prototype.moveRight = function(){
	this.player_x += 5;

}
Player.prototype.moveUp = function(){
	this.player_y -= 5;

}
Player.prototype.moveDown = function(){
	this.player_y += 5;

}
