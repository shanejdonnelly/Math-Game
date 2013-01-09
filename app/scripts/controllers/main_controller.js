var Main_Controller  = function(game, player){

	var
		$body = $('body'),
		$container = $('#container'),
		$board = $container.find('canvas#board'),
		$answer = $container.find('#answer'),
		$input = $answer.find('input'),
		$score = $container.find('#score');
		$timer = $container.find('#timer'),
		timer, 
		time = 0;

	$('#play').on('click', function(){ game.play();  })		
	$('#stop').on('click', function(){ game.pause();  })		

	$body.on('keydown', function(e){

			switch(e.which){
				case 37: 
					e.preventDefault();
					player.moveLeft();
					break;
				case 38: 
				//	e.preventDefault();
				//	player.moveUp();
					break;
				case 39: 
					e.preventDefault();
					player.moveRight();
					break;
				case 40: 
				//	e.preventDefault();
				//	player.moveDown();
					break;
				case 80: 
					e.preventDefault();
					game.play();
					break;
				case 83: 
					e.preventDefault();
					game.pause();
					break;
				case 13: 
					if(game.awaiting_answer){
					
						e.preventDefault();
						game.checkAnswer(parseInt($input.val()));

						break;
					}
			}	
   	});

	$container.on('question_prompted', function(e, question){
		$board.css('opacity', 0.5);
		$answer.css('display', 'block');
		$input.focus();	
		$answer.prepend('<p>' + question + ' =</p>');	
	});

	$container.on('answer_correct', function(){
		$board.css('opacity', 1);
		$score.append('<p>yay</p>');
		setTimeout(function(){
			$answer.fadeOut(200);
			$input.val('');
			$answer.find('p').remove();
		}, 200);

	});
	
	$container.on('answer_wrong', function(){
		$answer.append('<p>Boo!</p>');
		$board.css('opacity', 0.5);
		$answer.css('display', 'block');

	});

	$container.on('start_timer', function(){
		timer = setInterval(function(){
			time++;
			$timer.text(time);
		}, 1000);
	});
	
	$container.on('stop_timer', function(){
		clearInterval(timer);
	});





}

