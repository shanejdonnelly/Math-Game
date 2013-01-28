var Main_Controller  = function(game, player){

	var
		$body = $('body'),
		$container = $('#game'),
                $help = $('#help_content'),
		$board = $container.find('canvas#board'),
		$single_question = $container.find('#single_question'),
		$house = $container.find('#house'),
		$input = $single_question.find('input'),
		$score = $container.find('#score');
		$timer = $container.find('#timer'),
		timer, 
		time = 0;

	$('#play').on('click', function(){ $help.fadeOut(200); game.play();  })		
	$('#stop').on('click', function(){ game.pause();  })		


	jwerty.key('arrow-up', function(e){e.preventDefault(); player.moveUp();});
	jwerty.key('arrow-down', function(e){e.preventDefault(); player.moveDown();});
	jwerty.key('arrow-left', function(e){e.preventDefault(); player.moveLeft();});
	jwerty.key('arrow-right', function(e){e.preventDefault(); player.moveRight();});
	
	jwerty.key('ctrl + arrow-up', function(e){e.preventDefault(); player.moveUp('fast');});
	jwerty.key('ctrl + arrow-down', function(e){e.preventDefault(); player.moveDown('fast');});
	jwerty.key('ctrl + arrow-left', function(e){e.preventDefault(); player.moveLeft('fast');});
	jwerty.key('ctrl + arrow-right', function(e){e.preventDefault(); player.moveRight('fast');});


	jwerty.key('p', function(e){e.preventDefault(); $help.fadeOut(200); game.play();});
	jwerty.key('s', function(e){e.preventDefault(); game.pause();});
	jwerty.key('return', function(e){
					if(game.awaiting_answer){
						e.preventDefault();
						game.checkAnswer(parseInt($input.val()));
					}
	});

	$container.on('play', function(){
		$board.css('opacity', 1);
		timer = setInterval(function(){
			time++;
			$timer.text(time);
		}, 1000);
	});
	
	$container.on('pause', function(){
		$board.css('opacity', 0.5);
		clearInterval(timer);
	});

	$container.on('question_prompted', function(e, question){
		$single_question.css('display', 'block');
		$input.focus();	
		$single_question.prepend('<p>' + question + ' =</p>');	
	});

	$container.on('answer_correct', function(){
		$score.append('<p>yay</p>');
		setTimeout(function(){
			$single_question.fadeOut(200);
			$input.val('');
			$single_question.find('p').remove();
		}, 200);

	});
	
	$container.on('answer_wrong', function(){
		$single_question.append('<p>Boo!</p>');
		$single_question.css('display', 'block');

	});

	$container.on('visit_house', function(e, house){
		$house.fadeIn(200);		
		$house.append('<p class="intro">' + house.greeting +  '</p>');
		setTimeout(function(){$house.append('<p class="intro">Here are your questions.</p>');}, 1000);
		setTimeout(function(){$house.append('<p class="intro">Ready...</p>');},2000);	
		setTimeout(function(){$house.append('<p class="intro">Set...</p>');}, 3000);	
		setTimeout(function(){$house.append('<p class="intro">Go...</p>');}, 4000);		
		setTimeout(function(){$house.find('.intro').remove(); $single_question.css('z-index', 101); }, 5000);		
	});

	$container.on('leave_house', function(e, house){
		$single_question.css('z-index', 99);
		$house.append('<p class="outro">'+ house.goodbye + '</p>');
		setTimeout(function(){ $house.find('.outro').remove(); $house.fadeOut(300); }, 1000);
	});

}

