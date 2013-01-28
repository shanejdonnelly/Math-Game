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

  function showBoard(){
  $('#main_menu_content').prepend('<h1>Hi '+ current_user.name + ' !</h1>')
  $('#main_menu').slideDown();
  $('#game').fadeIn();
    //  var game = new Game($('#game'), document.getElementById('board'), current_user);               

  }
  function startGame(mode){
   var game = new Game($('#game'), document.getElementById('board'), current_user, mode);                  
    $('#main_menu').fadeOut();
    $('.game_controls').fadeIn();
    game.play();
  }

$('#login_form input').val('').focus();

$('body').on('click', '#play_mult_mode', function(e){
  startGame('*');
});

$('body').on('click', '#play_add_mode', function(e){
  startGame('+');
});

$('body').on('click', '#login_form button', function(e){
    e.preventDefault();
    var name = $('#login_form input').val();

    if(users[name]){ 
    current_user = users[name];
    $('#login').slideUp(function(){ showBoard(); });
    }
    else{
    $('#join').slideDown(function(){$('#login').slideUp();});
    $('#join_form input').val(name).focus();
    }
    });

$('body').on('click', '#join_form button', function(e){
    e.preventDefault();
    var name = $('#join_form input').val();

    //check user name not already used
    if(!users[name]){ 
    users[name] = {'name':name, 'level':1};
    current_user = users[name];
    localStorage.setItem('users', JSON.stringify(users));

    $('#join').slideUp(function(){showBoard();});

    }
    else{
    alert('sorry, name taken');
    }
    });

$('body').on('click', '#login a.join', function(e){
    e.preventDefault();
    $('#join').slideDown(function(){$('#login').slideUp();});
    $('#join_form input').val(name).focus();
    });

});
