var Question = function(game, level){
  this.level = level;
	this.answer = 0;
	this.question_string = '';
	this.create();
}

Question.prototype.create = function(){
    if(this.level === 1){
      var 
        base = this,
        num1 = Helper.rand(1,9),
        num2 = Helper.rand(1,9);

      this.answer = (num1 * num2);
      this.question_string = ' '+ num1 +' x '+ num2;
		}
}         


