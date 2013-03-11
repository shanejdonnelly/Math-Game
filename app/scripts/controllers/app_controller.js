MT.Controller

var 
  users_stringified = localStorage.getItem('users'), 
  users = users_stringified ? JSON.parse(users_stringified) : {},
  current_user, game;

  for (var key in users) {
  var obj = users[key]; 
  $('#player_list').append('<li class="btn btn-success" id="'+ obj.name  +'">'+ obj.name  +'</li>');           
  }

function startGame(mode){
  game = new Game($('#game'), document.getElementById('board'), current_user, mode);                  
  $('#main_menu').fadeOut();
  $('.game_controls').fadeIn();
  game.play();
}

var checkGame = setInterval(function(){

  if(typeof(game) !== 'undefined' && game.over === true){
    
    
    clearInterval(checkGame);
    localStorage.setItem('users', JSON.stringify(users));
    
  }
}, 100);



function preGame(){
  $('#display_current_player').text(current_user.name);
  $('#pick_player').fadeOut();
  $('#pick_game').fadeIn();
}

$('body').on('click', '#player_list li', function(e){
  var name = $(this).attr('id');
  current_user = users[name];
  console.log(current_user.level);
  preGame(); 
  
});

$('body').on('click', '#new_player', function(e){
  $('#join').fadeIn();    
  $('#join_form input').val('').focus();
});

$('body').on('click', '#play_mult_mode', function(e){
    startGame('*');
    });

$('body').on('click', '#play_add_mode', function(e){
    startGame('+');
    });

$('body').on('click', '#change_user', function(e){
  $('#pick_game').fadeOut();
  $('#pick_player').fadeIn();
});

$('body').on('click', '#join_form button', function(e){
    e.preventDefault();
    var name = $('#join_form input').val();

    //check user name not already used
    if(!users[name]){ 
    users[name] = {'name':name, 'level':1};
    current_user = users[name];
    localStorage.setItem('users', JSON.stringify(users));

    $('#join').slideUp(function(){preGame();});

    }
    else{
    alert('sorry, name taken');
    }
    });
