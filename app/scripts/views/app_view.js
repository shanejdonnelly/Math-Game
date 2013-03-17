var MT = MT || {};

$(function($){

  'use strict';

  MT.AppView = Backbone.View.extend({

    el: 'body',

    initialize: function(){ 
      this.users_stringified = localStorage.getItem('users'), 
      this.users = this.users_stringified ? JSON.parse(this.users_stringified) : {},
      this.current_user;
      this.displayUsers();
    },

    events:{
      'click #player_list li': 'selectCurrentUser',
      'click #new_player': 'showJoinForm',
      'click .play_mode': 'startGame'
    },

    displayUsers: function(){
      for (var key in this.users) {
        var obj = this.users[key]; 
        $('#player_list').append('<li class="btn btn-success" id="'+ obj.name  +'">'+ obj.name  +'</li>');           
      }
    },

    startGame: function(e){
      var mode = $(e.target).data('mode'),
      game = new Game($('#game'), this.current_user, mode);                  
      //  var game = new MT.GameView({mode: mode});
      $('#main_menu').fadeOut();
      $('.game_controls').fadeIn();
      game.play();
    },

    preGame: function(){
      $('#display_current_player').text(this.current_user.name);
      $('#pick_player').fadeOut();
      $('#pick_game').fadeIn();
    },

    selectCurrentUser: function(e){
      var name = $(e.target).attr('id');
      this.current_user = this.users[name];
      this.preGame(); 
    },

    showJoinForm: function(e){
      $('#join').fadeIn();    
      $('#join_form input').val('').focus();
    },

    changeUser: function(e){
      $('#pick_game').fadeOut();
      $('#pick_player').fadeIn();
    },

    addUser: function(e){
      e.preventDefault();
      var name = $('#join_form input').val();

      //check user name not already used
      if(!this.users[name]){ 
        this.users[name] = {'name':name, 'level':1};
        this.current_user = this.users[name];
        localStorage.setItem('users', JSON.stringify(this.users));

        $('#join').slideUp(function(){preGame();});

      }
      else{
        alert('sorry, name taken');
      }
    }

  });

});
