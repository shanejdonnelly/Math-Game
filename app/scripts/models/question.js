var Question = function(game, level, optional){
  this.level = level;
	this.answer = 0;
	this.question_string = '';
	this.create(optional);
}

Question.prototype.create = function(num){
    if(this.level === 1){
      var 
        base = this,
        num1 = (typeof(num) === 'undefined') ? Helper.rand(1,9) : num,
        num2 = Helper.rand(1,9);

      this.answer = (num1 * num2);
      this.question_string = ' '+ num1 +' x '+ num2;
		}
}

