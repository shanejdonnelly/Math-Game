var Player = function(game) {
  this.game = game;
  this.x = 100;
  this.y = 100;
	this.width=10;
	this.height = 10;
}

Player.prototype.update = function() {

  //this.game.drawRectangle('#f00', this.x, this.y, 10, 10);

}

Player.prototype.draw = function() {
  this.game.drawRectangle('#f00', this.x, this.y, 10, 10);
}

Player.prototype.moveLeft = function(){

	this.x -= 5;
}
Player.prototype.moveRight = function(){
	this.x += 5;

}
Player.prototype.moveUp = function(){
	this.y -= 5;

}
Player.prototype.moveDown = function(){
	this.y += 5;

}
