var MT = MT || {};

$(function($){

    'use strict';

    MT.AppView = Backbone.View.extend({

        el: 'body',

        initialize: function(){ 
            this.current_user;
            this.displayUsers();
        },

        events:{
            'click #player_list li': 'selectUserClick',
            'click #new_player': 'showJoinForm',
            'click .play_mode': 'startGame',
            'click #join_form button': 'addUser'
        },

        displayUsers: function(){
            var users = MT.Users.getUsers();
            for (var key in users) {
                var obj = users[key]; 
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

        selectUserClick: function(e){
            var name = $(e.target).attr('id');
            this.current_user = MT.Users.getUser(name);
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
            var name = $('#join_form input').val(),
                base = this;
            if(MT.Users.nameAvailable(name)){
                MT.Users.createUser(name);
                this.current_user = MT.Users.getUser(name);
                $('#join').slideUp(function(){base.preGame();});
            }
            else{
                alert('sorry, name taken');
            }
        }

    });

});
