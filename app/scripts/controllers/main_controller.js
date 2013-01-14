var Main_Controller  = function(game, player){

	var
		$body = $('body'),
		$container = $('#container'),
		$board = $container.find('canvas#board'),
		$single_question = $container.find('#single_question'),
		$input = $single_question.find('input'),
		$score = $container.find('#score');
		$timer = $container.find('#timer'),
		timer, 
		time = 0;

	$('#play').on('click', function(){ game.play();  })		
	$('#stop').on('click', function(){ game.pause();  })		


	jwerty.key('arrow-up', function(e){e.preventDefault(); player.moveUp();});
	jwerty.key('arrow-down', function(e){e.preventDefault(); player.moveDown();});
	jwerty.key('arrow-left', function(e){e.preventDefault(); player.moveLeft();});
	jwerty.key('arrow-right', function(e){e.preventDefault(); player.moveRight();});
	
	jwerty.key('ctrl + arrow-up', function(e){e.preventDefault(); player.moveUp('fast');});
	jwerty.key('ctrl + arrow-down', function(e){e.preventDefault(); player.moveDown('fast');});
	jwerty.key('ctrl + arrow-left', function(e){e.preventDefault(); player.moveLeft('fast');});
	jwerty.key('ctrl + arrow-right', function(e){e.preventDefault(); player.moveRight('fast');});


	jwerty.key('p', function(e){e.preventDefault(); game.play();});
	jwerty.key('s', function(e){e.preventDefault(); game.pause();});
	jwerty.key('return', function(e){
					if(game.awaiting_answer){
						e.preventDefault();
						game.checkAnswer(parseInt($input.val()));
					}
	});

/*	$body.on('keydown', function(e){

			switch(e.which){
				case 37: 
					e.preventDefault();
					player.moveLeft();
					break;
				case 38: 
					e.preventDefault();
					player.moveUp();
					break;
				case 39: 
					e.preventDefault();
					player.moveRight();
					break;
				case 40: 
					e.preventDefault();
					player.moveDown();
					break;
				case 32: 
					e.preventDefault();
					player.jump();
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
*/
	$container.on('question_prompted', function(e, question){
		$board.css('opacity', 0.5);
		$single_question.css('display', 'block');
		$input.focus();	
		$single_question.prepend('<p>' + question + ' =</p>');	
	});

	$container.on('answer_correct', function(){
		$board.css('opacity', 1);
		$score.append('<p>yay</p>');
		setTimeout(function(){
			$single_question.fadeOut(200);
			$input.val('');
			$single_question.find('p').remove();
		}, 200);

	});
	
	$container.on('answer_wrong', function(){
		$single_question.append('<p>Boo!</p>');
		$board.css('opacity', 0.5);
		$single_question.css('display', 'block');

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

