var MT = MT || {};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

//register globals
MT.CANVAS = document.getElementById('board');
MT.CTX = MT.CANVAS.getContext('2d');

$(function($){

  'use strict';
//  MT.Users = localStorage.getItem('users');
  MT.Users = new MT.UsersModel();
  new MT.AppView(); 
  
});
