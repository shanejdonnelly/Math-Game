$(function(){

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


var 
  users_stringified = localStorage.getItem('users'), 
  users = users_stringified ? JSON.parse(users_stringified) : {},
  current_user;

  for (var key in users) {
  var obj = users[key]; 
  $('#player_list').append('<li class="btn btn-success" id="'+ obj.name  +'">'+ obj.name  +'</li>');           
  }

function startGame(mode){
  var game = new Game($('#game'), document.getElementById('board'), current_user, mode);                  
  $('#main_menu').fadeOut();
  $('.game_controls').fadeIn();
  game.play();
}





function preGame(){
  $('#display_current_player').text(current_user.name);
  $('#pick_player').fadeOut();
  $('#pick_game').fadeIn();
}

$('body').on('click', '#player_list li', function(e){
  var name = $(this).attr('id');
  current_user = users[name];
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
});
