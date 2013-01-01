$(function(){

  var App = {


  
   	init: function(){
    	var canvas = document.getElementById('world');
    	var game = new Game(canvas);
			var player = new Player(game);
	    Controller.init(); 
  }

  
  
  
  }

	var Controller = {

		init: function(){
			this.bind();
		},

		bind: function(){
    	


			$('body').on('keydown', function(e){

				e.preventDefault();

    		switch(e.which) {
      	  case 37: // left
    	   	  App.game.movePlayer();
					break;

        	case 38: // up
						App.game.player.moveUp();
        	break;

	        case 39: // right
    	   	  App.game.player.moveRight();
  	      break;

    	    case 40: // down
    	   	  App.game.player.moveDown();
  	      break;
	
    	    default: return; // exit this handler for other keys
    	}
    	
   	});
 
  }

  }

	App.init()

});
