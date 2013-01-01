var Controller = function(game, player){
	$('#play').on('click', function(){ game.play();  })		
	$('#stop').on('click', function(){ game.pause();  })		

	$('body').on('keydown', function(e){

				e.preventDefault();

    		switch(e.which) {
      	  case 37: // left
    	   	  player.moveLeft();
					break;

        	case 38: // up
						player.moveUp();
        	break;

	        case 39: // right
    	   	  player.moveRight();
  	      break;

    	    case 40: // down
    	   	  player.moveDown();
  	      break;
	
    	    default: return; // exit this handler for other keys
    	}
    	
   	});
}

