var MT = MT || {};

$(function($){

    'use strict';


    MT.UsersModel = Backbone.Model.extend({
        initialize: function(){
            this.users_string = localStorage.getItem('users');
            this.users = this.users_string ? JSON.parse(this.users_string) : {};
        },
        getUsers: function(){
            return this.users;
        },
        getUser: function(name){
            return this.users[name];
        },
        saveUser:function(name, user_obj){
            this.users[name] = user_obj;  
            this.saveUsers();
        },
        saveUsers:function(){
            localStorage.setItem('users', JSON.stringify(this.users));
        },
        nameAvailable: function(name){
            return this.users[name] ? false : true;
        },

        createUser: function(name){
            //check user name not already used
            if(!this.users[name]){ 
                this.users[name] = {'name':name, 'level':1};
                this.saveUsers(); 
            }
            else{
                alert('sorry, name taken');
            }
        }
    });
});
